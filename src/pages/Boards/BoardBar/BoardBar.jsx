import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'

import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

const MENU_STYLE = {
  color: 'white',
  bgcolor: 'transparent',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '& .MuiSvgIcon-root': {
    color: 'white'
  },
  '&:hover': {
    bgcolor: 'primary.50'
  }
}

function BoardBar() {
  return (
    <Box sx={{
      bgcolor: 'white',
      width: '100%',
      height: (theme) => theme.trello.boardBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      paddingX: 2,
      overflowX: 'auto',
      backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
      borderBottom: '1px solid white'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip sx = {MENU_STYLE}
          icon={<DashboardIcon />}
          label="Vuong Duc Hieu Trello App"
          clickable
        />
        <Chip
          sx = {MENU_STYLE}
          icon={<VpnLockIcon />}
          label="Public/Private Workspace"
          clickable
        />
        <Chip
          sx = {MENU_STYLE}
          icon={<AddToDriveIcon />}
          label="Add to Google Driver"
          clickable
        />
        <Chip
          sx = {MENU_STYLE}
          icon={<BoltIcon />}
          label="Automation"
          clickable
        />
        <Chip
          sx = {MENU_STYLE}
          icon={<FilterListIcon />}
          label="Filters"
          clickable
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<PersonAddIcon />}
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': {
              borderColor: 'white'
            }
          }}
        >
          Create
        </Button>

        <AvatarGroup
          max={7}
          sx = {{
            gap: '10px',
            '& .MuiAvatar-root': {
              width: '34px',
              height: '34px',
              fontSize: '16px',
              border: 'none',
              color: 'white',
              '&:first-of-type': {
                backgroundColor: '#a4b0be'
              }
            }
          }}
        >
          <Tooltip title="vuong hieu">
            <Avatar alt="vuong hieu" src="https://i.pinimg.com/564x/4b/96/f6/4b96f65490c69c5fbf110a685da034c5.jpg" />
          </Tooltip>
          <Tooltip title="vuong hieu">
            <Avatar alt="vuong hieu" src="https://i.pinimg.com/564x/4b/96/f6/4b96f65490c69c5fbf110a685da034c5.jpg" />
          </Tooltip>
          <Tooltip title="vuong hieu">
            <Avatar alt="vuong hieu" src="https://i.pinimg.com/564x/4b/96/f6/4b96f65490c69c5fbf110a685da034c5.jpg" />
          </Tooltip>
          <Tooltip title="vuong hieu">
            <Avatar alt="vuong hieu" src="https://i.pinimg.com/564x/4b/96/f6/4b96f65490c69c5fbf110a685da034c5.jpg" />
          </Tooltip>
          <Tooltip title="vuong hieu">
            <Avatar alt="vuong hieu" src="https://i.pinimg.com/564x/4b/96/f6/4b96f65490c69c5fbf110a685da034c5.jpg" />
          </Tooltip>
          <Tooltip title="vuong hieu">
            <Avatar alt="vuong hieu" src="https://i.pinimg.com/564x/4b/96/f6/4b96f65490c69c5fbf110a685da034c5.jpg" />
          </Tooltip>
          <Tooltip title="vuong hieu">
            <Avatar alt="vuong hieu" src="https://i.pinimg.com/564x/4b/96/f6/4b96f65490c69c5fbf110a685da034c5.jpg" />
          </Tooltip>
          <Tooltip title="vuong hieu">
            <Avatar alt="vuong hieu" src="https://i.pinimg.com/564x/4b/96/f6/4b96f65490c69c5fbf110a685da034c5.jpg" />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar