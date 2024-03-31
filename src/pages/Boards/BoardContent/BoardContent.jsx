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
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null)

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
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)

    //Nếu là kéo card thì mới thực hiện hành động set giá trị oldColumn
    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id))
    }
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

    //Xử lý kéo thả Cards
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      //activeDraggingCard: là card đang được kéo
      const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
      //overCard: là card đang được tương tác trên hoặc dưới so với cái card được kéo ở trên
      const { id : overCardId } = over

      //Tìm 2 column theo cardId
      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)

      //Nếu ko tồn tại 1 trong 2 column thì không làm gì
      if (!activeColumn || !overColumn) return

      //Phải dùng activeDragItemData.columnId hoặc oldColumnWhenDraggingCard._id (set vào state từ bước
      //handleDragStart) chứ ko phải activeData trong scope handleDragEnd này vì sau khi đi qua onDragOver
      //tới đây là state của card đã bị cập nhật 1 lần
      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        //
      } else {
        //Hành động kéo thả card trong cùng một column
        //lấy vị trị cũ từ oldColumnWhenDraggingCard
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(c => c._id === activeDragItemId)
        //lấy vị trí mới từ over
        const newCardIndex = overColumn?.cards?.findIndex(c => c._id === overCardId)

        //logic kéo card trong column tương tự logic kéo column trong boardContent
        const dndOrderedCards = arrayMove(oldColumnWhenDraggingCard?.cards, oldCardIndex, newCardIndex)

        setOrderedColumnState(prevColumns => {
          //Clone mảng OrderedColumnsState cũ ra một cái mới để xử lý data
          //Return - Cập nhật lại OrderedColumnState mới
          const nextColumns = cloneDeep(prevColumns)

          //Tìm tới column mà chúng ta đang thả
          const targetColumn = nextColumns.find(column => column._id === overColumn._id)

          //Cập nhật lại 2 giá trị mới là card và cardOrderIds trong targetColumn
          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCards.map(card => card._id)


          //Trả về giá trị state mới chuẩn vị trí
          return nextColumns
        })
      }
    }

    //Xử lý kéo thả Columns
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id !== over.id) {
        //lấy vị trị cũ từ active
        const oldColumnIndex = orderedColumnState.findIndex(c => c._id === active.id)
        //lấy vị trí mới từ over
        const newColumnIndex = orderedColumnState.findIndex(c => c._id === over.id)

        //dùng arrayMove để sắp xếp lại mảng Column ban đầu
        const dndOrderedColumn = arrayMove(orderedColumnState, oldColumnIndex, newColumnIndex)
        // const dndOrderedColumnIds = dndOrderedColumn.map(c => c._id)
        // console.log(dndOrderedColumn)
        // console.log(dndOrderedColumnIds)

        //Update state sau khi đã kéo thả
        setOrderedColumnState(dndOrderedColumn)
      }
    }

    //Những dữ liệu sau khi kéo thả luôn phải đưa về giá trị null mặc định ban đầu
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumnWhenDraggingCard(null)
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