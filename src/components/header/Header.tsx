import React, { useContext, useState } from 'react'
import { GlobalContext } from '../../contexts/GlobalContext'
import { Locales, Themes, TLocale } from '../../models/GlobalContextModel'
import { useAppDispatch, useAppSelector } from '../../store'
import { logOut } from '../../store/slices/authSlice/authSlice'
import { useNavigate } from 'react-router-dom'

import { MaterialUISwitch } from '../material/switch/switch'
import { MaterialUISearch } from '../material/search/search'
import { DrawerHeader } from '../material/drawerHeader/drawerHeader'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Drawer from '@mui/material/Drawer'
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import LogoutIcon from '@mui/icons-material/Logout'
import LoginIcon from '@mui/icons-material/Login'
import HowToRegIcon from '@mui/icons-material/HowToReg'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { theme, setTheme, locale, setLocale } = useContext(GlobalContext)
  const { isAuth, user } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const handleChangeTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
    const theme = event.target.checked ? Themes.Dark : Themes.Light
    setTheme(theme)
    localStorage.setItem('theme', theme)
  }

  const handleChangeLocale = (event: SelectChangeEvent) => {
    setLocale(event.target.value as TLocale)
    localStorage.setItem('locale', locale)
  }

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return
    }

    setIsOpen(open)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            LOGO
          </Typography>
          <MaterialUISearch />
          <IconButton sx={{ marginLeft: '10px' }} onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Drawer anchor={'right'} open={isOpen} onClose={toggleDrawer(false)}>
            <Box
              sx={{ width: 250, display: 'flex', flexDirection: 'column' }}
              role='presentation'
              onKeyDown={toggleDrawer(false)}
            >
              <DrawerHeader>
                <IconButton onClick={toggleDrawer(false)}>
                  <ChevronRightIcon />
                </IconButton>
              </DrawerHeader>
              <Divider />
              <List>
                <ListItem disablePadding onClick={toggleDrawer(false)}>
                  <ListItemButton onClick={() => navigate('/collections')}>
                    <ListItemText primary={'Collections'} />
                  </ListItemButton>
                </ListItem>
                {user && user.role === 'ADMIN' && (
                  <ListItem disablePadding onClick={toggleDrawer(false)}>
                    <ListItemButton onClick={() => navigate('/users')}>
                      <ListItemText primary={'Users'} />
                    </ListItemButton>
                  </ListItem>
                )}
              </List>
              <Divider />
              <List sx={{ padding: '8px 16px' }}>
                <ListItem disablePadding>
                  <ListItemText primary={'Theme'} />
                  <MaterialUISwitch
                    sx={{ m: 1 }}
                    checked={theme === Themes.Dark ? true : false}
                    onChange={handleChangeTheme}
                  />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText primary={'Locale'} />
                  <Select
                    value={locale}
                    onChange={handleChangeLocale}
                    sx={{ minWidth: 150 }}
                    size='small'
                  >
                    <MenuItem value={Locales.EN}>En</MenuItem>
                    <MenuItem value={Locales.RU}>Ru</MenuItem>
                  </Select>
                </ListItem>
              </List>
              <Divider />
              {isAuth ? (
                <List>
                  <ListItem disablePadding onClick={toggleDrawer(false)}>
                    <ListItemButton
                      onClick={() => {
                        navigate('/')
                        dispatch(logOut())
                      }}
                    >
                      <ListItemIcon>
                        <LogoutIcon />
                      </ListItemIcon>
                      <ListItemText primary={'Logout'} />
                    </ListItemButton>
                  </ListItem>
                </List>
              ) : (
                <List>
                  <ListItem disablePadding onClick={toggleDrawer(false)}>
                    <ListItemButton onClick={() => navigate('auth/login')}>
                      <ListItemIcon>
                        <LoginIcon />
                      </ListItemIcon>
                      <ListItemText primary={'Login'} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={toggleDrawer(false)}>
                    <ListItemButton onClick={() => navigate('auth/signup')}>
                      <ListItemIcon>
                        <HowToRegIcon />
                      </ListItemIcon>
                      <ListItemText primary={'Registration'} />
                    </ListItemButton>
                  </ListItem>
                </List>
              )}
            </Box>
          </Drawer>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export { Header }
