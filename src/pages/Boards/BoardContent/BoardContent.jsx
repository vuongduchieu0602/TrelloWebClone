import Box from '@mui/material/Box'
import ListColumns from './List Columns/ListColumns'

function BoardContent({ board }) {
  return (
    <Box sx={{
      bgcolor: 'primary.light',
      height: (theme) => theme.trello.boardContentHeight,
      width: '100%',
      display: 'flex',
      backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
      padding: '10px 0'
    }}>
      <ListColumns columns={board?.columns}/>
    </Box>
  )
}

export default BoardContent