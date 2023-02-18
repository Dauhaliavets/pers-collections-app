import React from 'react'
import { useNavigate } from 'react-router-dom'

import { List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import { useAppSelector } from '../../../../store'

interface IAccessiblePagesListProps {
  toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void
}

export const AccessiblePagesList: React.FC<IAccessiblePagesListProps> = ({ toggleDrawer }) => {
  const { user } = useAppSelector((state) => state.auth)
  const navigate = useNavigate()

  return (
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
  )
}
