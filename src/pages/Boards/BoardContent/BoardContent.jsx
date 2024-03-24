import { useEffect, useState } from 'react'

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
  defaultDropAnimationSideEffects
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

  const handleDragStart = (event) => {
    console.log('Handle Drag Start: ', event)
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)
  }

  const handleDragEnd = (event) => {
    const { active, over } = event

    //fix bug click sự kiện kéo thả
    if (!over) return

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
      onDragStart={handleDragStart}
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



