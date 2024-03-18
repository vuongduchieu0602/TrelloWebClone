import Button from '@mui/material/Button'

import Typography from '@mui/material/Typography'

import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'

import GroupIcon from '@mui/icons-material/Group'

function Card({temporaryHideMedia}) {
  if (temporaryHideMedia) {
    return (
      <MuiCard sx={{
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
        overflow: 'unset'
      }}>
        <CardContent sx={{
          padding: 1.5,
          '&:last-child': { padding: 1.5 }
        }}>
          <Typography>
            Vuong Duc Hieu
          </Typography>
        </CardContent>
      </MuiCard>
    )
  } else {
    return (
      <MuiCard sx={{
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
      </MuiCard>
    )
  }
}

export default Card