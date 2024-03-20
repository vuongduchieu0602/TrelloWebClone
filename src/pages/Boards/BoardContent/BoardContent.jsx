import Box from '@mui/material/Box'
import ListColumns from './List Columns/ListColumns'

import { mapOrder } from '~/utils/sort'

function BoardContent({ board }) {
  const orderedColumn = mapOrder(board?.columns, board?.columnOrderIds, '_id')

  return (
    <Box sx={{
      bgcolor: 'primary.light',
      height: (theme) => theme.trello.boardContentHeight,
      width: '100%',
      display: 'flex',
      backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
      padding: '10px 0'
    }}>
      <ListColumns columns={orderedColumn}/>
    </Box>
  )
}

export default BoardContent