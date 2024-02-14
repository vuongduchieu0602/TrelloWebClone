import Box from '@mui/material/Box'

function BoardBar() {
  return (
    <Box sx={{
      bgcolor: 'primary.dark',
      height: (theme) => theme.trello.boardBarHeight,
      width: '100%',
      display: 'flex',
      alignItems: 'center'
    }}>
        Board Bar
    </Box>
  )
}

export default BoardBar