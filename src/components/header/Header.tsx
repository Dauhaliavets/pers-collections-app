import React from 'react'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { HeaderDrawer } from './headerDrawer/HeaderDrawer'
import { HeaderSearch } from './headerSearch/HeaderSearch'

const Header: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            LOGO
          </Typography>
          <HeaderSearch />
          <HeaderDrawer />
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export { Header }
