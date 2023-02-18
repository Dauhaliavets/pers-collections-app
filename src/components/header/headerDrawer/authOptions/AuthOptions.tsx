import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../../store'
import { logOut } from '../../../../store/slices/authSlice/authSlice'

import LogoutIcon from '@mui/icons-material/Logout'
import LoginIcon from '@mui/icons-material/Login'
import HowToRegIcon from '@mui/icons-material/HowToReg'
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

interface IAuthOptionsProps {
  toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void
}

export const AuthOptions: React.FC<IAuthOptionsProps> = ({ toggleDrawer }) => {
  const { isAuth } = useAppSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  if (isAuth)
    return (
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
    )

  return (
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
  )
}
