import { useEffect, useState } from 'react'
import { cloneDeep } from 'lodash'

import Box from '@mui/material/Box'
import ListColumns from './List Columns/ListColumns'


import { mapOrder } from '~/utils/sort'

import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimation,
  defaultDropAnimationSideEffects,
  closestCorners
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'

import Column from './List Columns/Column/Column'
import Card from './List Columns/Column/ListCards/Card/Card'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({ board }) {
  //nếu dùng pointerSensor mặc định thì phải kết hợp thuộc tính CSS touch-action: none ở những phần tử kéo thả
  // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })  //còn bug
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })

  //nhấn giữ 250ms và dung sai của cảm ứng
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })

  //kết hợp mouse và touch sensor để có trải nghiệm mobile tốt nhất
  const sensors = useSensors(mouseSensor, touchSensor)

  const [orderedColumnState, setOrderedColumnState] = useState([])

  //Cùng một thời điểm chỉ có một phần tử được kéo (column hoặc card)
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)

  useEffect(() => {
    const orderedColumn = mapOrder(board?.columns, board?.columnOrderIds, '_id')
    setOrderedColumnState(orderedColumn)
  }, [board])

  const findColumnByCardId = (cardId) => {
    //Làm dữ liệu cho cards hoàn chỉnh trước rồi mới tạo ra cardOrderIds mới
    return orderedColumnState.find(column => column?.cards?.map(card => card._id)?.includes(cardId))
  }

  //Trigger khi bắt đầu kéo
  const handleDragStart = (event) => {
    console.log('Handle Drag Start: ', event)
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)
  }

  //Trigger trong quá trình kéo
  const handleDragOver = (event) => {
    //Không xử lý gì nếu kéo Column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

    const { active, over } = event

    //Đảm bảo tồn tại active hoặc over (khi kéo ra khỏi phạm vi container) thì ko làm gì (tránh crash trang)
    if (!active || !over) return

    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
    const { id : overCardId } = over

    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)

    if (!activeColumn || !overColumn) return

    if (activeColumn._id !== overColumn._id) {
      setOrderedColumnState(prevColumns => {
        //tìm vị trí index của overCard trong column đích nơi mà activeCard sắp được thả
        const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)

        let newCardIndex
        const isBelowOverItem = active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height
        const modifier = isBelowOverItem ? 1 : 0
        newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.card?.length + 1

        //Clone mảng OrderedColumnsState cũ ra một cái mới để xử lý data
        //Return - Cập nhật lại OrderedColumnState mới
        const nextColumns = cloneDeep(prevColumns)

        const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
        const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

        //Column cũ
        if (nextActiveColumn) {
          //Xóa card ở column active (column cũ) lúc mà kéo card ra khỏi để sang column khác
          nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)

          //Cập nhật lại mảng cardOrderIds cho chuẩn dữ liệu
          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
        }

        //Column mới
        if (nextOverColumn) {
          //Kiểm tra xem card đang kéo nó có tồn tại ở overColumn chưa, nếu có thì cần xóa nó trước
          nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)

          //Thêm card đang kéo vào overColumn theo vị trí index mới
          nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, activeDraggingCardData)

          //Cập nhật lại mảng cardOrderIds cho chuẩn dữ liệu
          nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
        }

        return nextColumns
      })
    }

  }

  //Trigger kết thúc hành động kéo
  const handleDragEnd = (event) => {
    const { active, over } = event

    //Đảm bảo tồn tại active hoặc over (khi kéo ra khỏi phạm vi container) thì ko làm gì (tránh crash trang)
    if (!active || !over) return

    if (active.id !== over.id) {
      //lấy vị trị cũ từ active
      const oldIndex = orderedColumnState.findIndex(c => c._id === active.id)
      //lấy vị trí mới từ over
      const newIndex = orderedColumnState.findIndex(c => c._id === over.id)

      //dùng arrayMove để sắp xếp lại mảng Column ban đầu
      const dndOrderedColumn = arrayMove(orderedColumnState, oldIndex, newIndex)
      // const dndOrderedColumnIds = dndOrderedColumn.map(c => c._id)
      // console.log(dndOrderedColumn)
      // console.log(dndOrderedColumnIds)

      //Update state sau khi đã kéo thả
      setOrderedColumnState(dndOrderedColumn)
    }

    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
  }

  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      style: {
        active: {
          opacity: 0.5
        }
      }
    })
  }

  return (
    <DndContext
      sensors={sensors}
      //Thuật toán phát hiện va chạm (nếu không có nó thì card với cover lớn sẽ không kéo qua Column được vì lúc này bị conflict giữa card và column)
      //dùng closestCorners thay vì closestCenter
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Box sx={{
        bgcolor: 'primary.light',
        height: (theme) => theme.trello.boardContentHeight,
        width: '100%',
        display: 'flex',
        backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        padding: '10px 0'
      }}>
        <ListColumns columns={orderedColumnState}/>
        <DragOverlay dropAnimation={customDropAnimation}>
          {!activeDragItemType && null}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData}/>}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData}/>}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent