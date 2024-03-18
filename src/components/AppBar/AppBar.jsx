import { useState } from 'react'

import Box from '@mui/material/Box'

import ModeSelect from '../ModeSelect/ModeSelect'
import SvgIcon from '@mui/material/SvgIcon'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Badge from '@mui/material/Badge'
import Tooltip from '@mui/material/Tooltip'
import { InputAdornment } from '@mui/material'

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
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'

function AppBar() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.trello.appBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      paddingX: '16px',
      overflowX: 'auto',
      overflowY: 'hidden',
      backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0')
    }} >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <AppsIcon sx={{ color:'white' }}/>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <SvgIcon component={ TrelloLogo } fontSize = "small" inheritViewBox sx={{ color:'white' }} />
          <Typography variant="span" sx={{ color:'white', fontSize:'1.2rem', fontWeight:'bold' }}>Trello</Typography>
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex'}, gap: 1 }}>
          <Workspaces />
          <Recent />
          <Starred />
          <Templates />

          <Button 
            sx={{
              color: 'white',
              border: 'none',
              '&:hover': {
                border: 'none'
              }
            }}
            variant="outlined" 
            startIcon={<AddToPhotosIcon sx={{ color: 'white' }}/>}
          >
            Create
          </Button>
        </Box>

      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField 
          id="outlined-search" 
          label="Search..." 
          type="text" 
          size="small"
          value={searchValue}
          onChange = { (e) => setSearchValue(e.target.value) }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'white' }}/>
              </InputAdornment>
            ),
            endAdornment: (
              <CloseIcon 
                fontSize = "small"
                sx = {{
                  color: searchValue ? 'white' : 'transparent', cursor: 'pointer'
                }}
                onClick = { ()=>setSearchValue('') }
              />
            )
          }}
          sx={{ 
            minWidth: '120px' ,
            maxWidth: '180px',
            '& input': { color: 'white' },
            '& label': { color: 'white' },
            '& label.Mui-focused': { color: 'white' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white'
              },
              '&:hover fieldset': {
                borderColor: 'white'
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white'
              }
            }
          }} 
        />

        <ModeSelect />

        <Tooltip title="Notification">
          <Badge color="warning" variant="dot" sx={{ cursor: 'pointer' }}>
            <NotificationsNoneIcon sx={{ color: 'white' }}/>
          </Badge>
        </Tooltip>

        <Tooltip title="Help">
          <Badge sx={{ cursor: 'pointer' }}>
            <HelpOutlineIcon sx={{ color: 'white' }}/>
          </Badge>
        </Tooltip>

        <Profile />
      </Box>
    </Box>
  )
}

export default AppBar


