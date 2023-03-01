import React from 'react'
import { useNavigate } from 'react-router-dom'
import { HeaderDrawer } from './headerDrawer/HeaderDrawer'
import { HeaderSearch } from './headerSearch/HeaderSearch'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/system/Container'
import Logo from '../../assets/logo.svg'

const Header: React.FC = () => {
  const navigate = useNavigate()

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar
          sx={{
            py: 1,
            px: { sm: 1, xs: 0 },
            display: 'flex',
            flexWrap: { sm: 'nowrap', xs: 'wrap' },
            gap: 1,
          }}
        >
          <Box
            sx={{
              flex: { sm: '1 1 100%', xs: '1 1 auto' },
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box
              component='img'
              src={Logo}
              alt='logo-image'
              sx={{
                alignSelf: 'flex-start',
              }}
              onClick={() => navigate('/')}
            />
          </Box>
          <HeaderSearch />
          <HeaderDrawer />
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export { Header }
