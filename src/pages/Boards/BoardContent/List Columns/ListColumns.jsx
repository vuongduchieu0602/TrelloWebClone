import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'

import AddBoxIcon from '@mui/icons-material/AddBox'

function ListColumns() {
  return (
    <Box sx={{
      width: '100%',
      height: '100%',
      display: 'flex',
      backgroundColor: 'inherit',
      overflowX: 'auto',
      overflowY: 'hidden',
      '&::-webkit-scrollbar-track': { margin: 2 }
    }}>
      <Column />
      <Column />
      <Column />

      <Box sx={{
        minWidth: '200px',
        maxWidth: '200px',
        mx: 2,
        borderRadius: '6px',
        height: 'fit-content',
        backgroundColor: '#ffffff3d'
      }}>
        <Button
          startIcon={<AddBoxIcon />}
          sx={{
            color: 'white',
            justifyContent: 'flex-start',
            py: 1,
            pl: 2.5
          }}
        >
          Add new column
        </Button>
      </Box>
    </Box>
  )
}

export default ListColumns