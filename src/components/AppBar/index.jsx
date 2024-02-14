import Box from '@mui/material/Box'

import ModeSelect from '../ModeSelect/index'

function AppBar() {
  return (
    <Box sx={{
      bgcolor: 'primary.light',
      height: (theme) => theme.trello.appBarHeight,
      width: '100%',
      display: 'flex',
      alignItems: 'center'
    }}>
      <ModeSelect />
    </Box>
  )
}

export default AppBar