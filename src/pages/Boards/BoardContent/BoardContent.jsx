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
  useSensors
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'


function BoardContent({ board }) {
  //nếu dùng pointerSensor mặc định thì phải kết hợp thuộc tính CSS touch-action: none ở những phần tử kéo thả
  // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })  //còn bug
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })

  //nhấn giữ 250ms và dung sai của cảm ứng
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })

  //kết hợp mouse và touch sensor để có trải nghiệm mobile tốt nhất
  const sensors = useSensors(mouseSensor, touchSensor)

  const [orderedColumnState, setOrderedColumnState] = useState([])

  useEffect(() => {
    const orderedColumn = mapOrder(board?.columns, board?.columnOrderIds, '_id')
    setOrderedColumnState(orderedColumn)
  }, [board])

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
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Box sx={{
        bgcolor: 'primary.light',
        height: (theme) => theme.trello.boardContentHeight,
        width: '100%',
        display: 'flex',
        backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        padding: '10px 0'
      }}>
        <ListColumns columns={orderedColumnState}/>
      </Box>
    </DndContext>
  )
}

export default BoardContent



