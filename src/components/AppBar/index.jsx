import Box from '@mui/material/Box'

import ModeSelect from '../ModeSelect/index'
import SvgIcon from '@mui/material/SvgIcon'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Badge from '@mui/material/Badge'
import Tooltip from '@mui/material/Tooltip'

import Workspaces from './Menus/Workspaces'
import Recent from './Menus/Recent'
import Starred from './Menus/Starred'
import Templates from './Menus/Templates'
import Profile from './Menus/Profile'

import AppsIcon from '@mui/icons-material/Apps'
import TrelloLogo from '~/assets/trello.svg?react'
import Typography from '@mui/material/Typography'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'

function AppBar() {
  return (
    <Box p={2} sx={{
      bgcolor: 'white',
      height: (theme) => theme.trello.appBarHeight,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2
      }}>
        <AppsIcon sx={{ color:'primary.main' }}/>
        <Box sx={{
          display: 'flex',
          alignItems: 'center'
        }}>
          <SvgIcon component={TrelloLogo} fontSize={ 'small' } inheritViewBox sx={{ color:'primary.main' }}/>
          <Typography variant="span" sx={{ color:'primary.main', fontSize:'1.2rem', fontWeight:'bold' }}>Trello</Typography>
        </Box>

        <Workspaces />
        <Recent />
        <Starred />
        <Templates />

        <Button variant="outlined">Create</Button>
      </Box>

      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2
      }}>
        <TextField id="outlined-search" label="Search..." type="search" size="small"/>

        <ModeSelect />

        <Tooltip title="Notification">
          <Badge color="secondary" variant="dot" sx={{ cursor: 'pointer' }}>
            <NotificationsNoneIcon />
          </Badge>
        </Tooltip>

        <Tooltip title="Help">
          <Badge sx={{ cursor: 'pointer' }}>
            <HelpOutlineIcon />
          </Badge>
        </Tooltip>

        <Profile />
      </Box>
    </Box>
  )
}

export default AppBar