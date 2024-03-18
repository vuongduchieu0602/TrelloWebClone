import { useState } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Fade from '@mui/material/Fade'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Typography from '@mui/material/Typography'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import Cloud from '@mui/icons-material/Cloud'
import Divider from '@mui/material/Divider'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Tooltip from '@mui/material/Tooltip'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import CommentIcon from '@mui/icons-material/Comment';
import AttachmentIcon from '@mui/icons-material/Attachment'


import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AddCardIcon from '@mui/icons-material/AddCard'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import GroupIcon from '@mui/icons-material/Group'

const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '56px'


function BoardContent() {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box sx={{
      bgcolor: 'primary.light',
      height: (theme) => theme.trello.boardContentHeight,
      width: '100%',
      display: 'flex',
      backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
      padding: '10px 0'
    }}>
      <Box sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        backgroundColor: 'inherit',
        overflowX: 'auto',
        overflowY: 'hidden',
        '&::-webkit-scrollbar-track': { margin: 2 }
      }}>
        {/* Box Column 01*/}
        <Box sx={{
          minWidth: '300px',
          maxWidth: '300px',
          backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0'),
          ml: 2,
          borderRadius: '6px',
          height: 'fit-content',
          maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
        }}>
          <Box sx={{
            height: COLUMN_HEADER_HEIGHT,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Typography variant='h6'
              sx={{
                fontSize: '1rem',
                fontWeight: 'bold'

              }}
            >
              Column Title
            </Typography>
            <Tooltip title="More options">
              <ExpandMoreIcon 
                id="basic-column-dropdown"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{ color: 'text.primary' }}
              />
            </Tooltip>
            <Menu
              id="fade-menu"
              MenuListProps={{
                'aria-labelledby': 'basic-column-dropdown'
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              <MenuItem>
                <ListItemIcon>
                  <AddCardIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Add new card</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCut fontSize="small" />
                </ListItemIcon>
                <ListItemText>Cut</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCopy fontSize="small" />
                </ListItemIcon>
                <ListItemText>Copy</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentPaste fontSize="small" />
                </ListItemIcon>
                <ListItemText>Paste</ListItemText>
              </MenuItem>
              
              <Divider />
              <MenuItem>
                <ListItemIcon>
                  <DeleteForeverIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Remove this column</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <Cloud fontSize="small" />
                </ListItemIcon>
                <ListItemText>Archive this column</ListItemText>
              </MenuItem>
            </Menu>
          </Box>

          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            padding: '0 5px',
            margin: '0 5px',
            overflowX: 'hidden',
            overflowY: 'auto',
            maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)} - ${COLUMN_HEADER_HEIGHT} - ${COLUMN_FOOTER_HEIGHT})`,
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#ced0da'
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: '#bfc2bf'
            }
          }}>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardMedia
                sx={{ height: 140 }}
                image="https://i.pinimg.com/564x/84/6c/d0/846cd0fae3dff07a325e7c1befa517d2.jpg"
                title="green iguana"
              />
              <CardContent sx={{
                padding: 1.5,
                '&:last-child': { padding: 1.5 }
              }}>
                <Typography>
                  Vuong Duc Hieu
                </Typography>
              </CardContent>
              <CardActions sx={{ padding: '0 4px 8px 4px'}}>
                <Button size="small" startIcon={<GroupIcon />}>20</Button>
                <Button size="small" startIcon={<CommentIcon />}>15</Button>
                <Button size="small" startIcon={<AttachmentIcon />}>10</Button>
              </CardActions>
            </Card>

            <Card sx={{ 
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{
                padding: 1.5,
                '&:last-child': { padding: 1.5 }
              }}>
                <Typography>
                  Card 01
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ 
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{
                padding: 1.5,
                '&:last-child': { padding: 1.5 }
              }}>
                <Typography>
                  Card 01
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ 
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{
                padding: 1.5,
                '&:last-child': { padding: 1.5 }
              }}>
                <Typography>
                  Card 01
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ 
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{
                padding: 1.5,
                '&:last-child': { padding: 1.5 }
              }}>
                <Typography>
                  Card 01
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ 
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{
                padding: 1.5,
                '&:last-child': { padding: 1.5 }
              }}>
                <Typography>
                  Card 01
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ 
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{
                padding: 1.5,
                '&:last-child': { padding: 1.5 }
              }}>
                <Typography>
                  Card 01
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ 
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{
                padding: 1.5,
                '&:last-child': { padding: 1.5 }
              }}>
                <Typography>
                  Card 01
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ 
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{
                padding: 1.5,
                '&:last-child': { padding: 1.5 }
              }}>
                <Typography>
                  Card 01
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ 
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{
                padding: 1.5,
                '&:last-child': { padding: 1.5 }
              }}>
                <Typography>
                  Card 01
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ 
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{
                padding: 1.5,
                '&:last-child': { padding: 1.5 }
              }}>
                <Typography>
                  Card 01
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ 
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{
                padding: 1.5,
                '&:last-child': { padding: 1.5 }
              }}>
                <Typography>
                  Card 01
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ 
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{
                padding: 1.5,
                '&:last-child': { padding: 1.5 }
              }}>
                <Typography>
                  Card 01
                </Typography>
              </CardContent>
            </Card>

          </Box>

          <Box sx={{
            height: COLUMN_FOOTER_HEIGHT,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Button startIcon={<AddCardIcon />}>
              Add new card
            </Button>
            <Tooltip title="Drag to move">
              <DragHandleIcon sx={{ cursor: 'pointer' }}/>
            </Tooltip>
          </Box>
        </Box>

        {/* Box Column 02*/}
        <Box sx={{
          minWidth: '300px',
          maxWidth: '300px',
          backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0'),
          ml: 2,
          borderRadius: '6px',
          height: 'fit-content',
          maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
        }}>
          <Box sx={{
            height: COLUMN_HEADER_HEIGHT,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Typography variant='h6'
              sx={{
                fontSize: '1rem',
                fontWeight: 'bold'

              }}
            >
              Column Title
            </Typography>
            <Tooltip title="More options">
              <ExpandMoreIcon 
                id="basic-column-dropdown"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{ color: 'text.primary' }}
              />
            </Tooltip>
            <Menu
              id="fade-menu"
              MenuListProps={{
                'aria-labelledby': 'basic-column-dropdown'
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              <MenuItem>
                <ListItemIcon>
                  <AddCardIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Add new card</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCut fontSize="small" />
                </ListItemIcon>
                <ListItemText>Cut</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCopy fontSize="small" />
                </ListItemIcon>
                <ListItemText>Copy</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentPaste fontSize="small" />
                </ListItemIcon>
                <ListItemText>Paste</ListItemText>
              </MenuItem>
              
              <Divider />

              <MenuItem>
                <ListItemIcon>
                  <DeleteForeverIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Remove this column</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <Cloud fontSize="small" />
                </ListItemIcon>
                <ListItemText>Archive this column</ListItemText>
              </MenuItem>
            </Menu>
          </Box>

          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            padding: '0 5px',
            margin: '0 5px',
            overflowX: 'hidden',
            overflowY: 'auto',
            maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)} - ${COLUMN_HEADER_HEIGHT} - ${COLUMN_FOOTER_HEIGHT})`,
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#ced0da'
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: '#bfc2bf'
            }
          }}>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardMedia
                sx={{ height: 140 }}
                image="https://i.pinimg.com/564x/84/6c/d0/846cd0fae3dff07a325e7c1befa517d2.jpg"
                title="green iguana"
              />
              <CardContent sx={{
                padding: 1.5,
                '&:last-child': { padding: 1.5 }
              }}>
                <Typography>
                  Vuong Duc Hieu
                </Typography>
              </CardContent>
              <CardActions sx={{ padding: '0 4px 8px 4px'}}>
                <Button size="small" startIcon={<GroupIcon />}>20</Button>
                <Button size="small" startIcon={<CommentIcon />}>15</Button>
                <Button size="small" startIcon={<AttachmentIcon />}>10</Button>
              </CardActions>
            </Card>

            <Card sx={{ 
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{
                padding: 1.5,
                '&:last-child': { padding: 1.5 }
              }}>
                <Typography>
                  Card 01
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ 
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{
                padding: 1.5,
                '&:last-child': { padding: 1.5 }
              }}>
                <Typography>
                  Card 01
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ 
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{
                padding: 1.5,
                '&:last-child': { padding: 1.5 }
              }}>
                <Typography>
                  Card 01
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ 
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{
                padding: 1.5,
                '&:last-child': { padding: 1.5 }
              }}>
                <Typography>
                  Card 01
                </Typography>
              </CardContent>
            </Card>
          </Box>

          <Box sx={{
            height: COLUMN_FOOTER_HEIGHT,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Button startIcon={<AddCardIcon />}>
              Add new card
            </Button>
            <Tooltip title="Drag to move">
            <DragHandleIcon sx={{ cursor: 'pointer' }}/>
          </Tooltip>
        </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default BoardContent