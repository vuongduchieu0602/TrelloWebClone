import Box from '@mui/material/Box'


function BoardContent() {
  return (
    <Box sx={{
      bgcolor: 'primary.light',
      height: (theme) => `calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight} )`,
      width: '100%',
      display: 'flex',
      alignItems: 'center'
    }}>
        Board Content
    </Box>
  )
}

export default BoardContent