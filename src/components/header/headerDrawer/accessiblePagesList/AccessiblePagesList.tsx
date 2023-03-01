import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../../../store'
import { Role } from '../../../../models/User.model'
import { IAccessiblePagesListProps } from './accessiblePagesList.types'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { useIntl } from 'react-intl'

export const AccessiblePagesList: React.FC<IAccessiblePagesListProps> = ({ toggleDrawer }) => {
  const { user } = useAppSelector((state) => state.auth)
  const navigate = useNavigate()
  const intl = useIntl()

  return (
    <List>
      <ListItem disablePadding onClick={toggleDrawer(false)}>
        <ListItemButton onClick={() => navigate('/home')}>
          <ListItemText
            primary={intl.formatMessage({ id: 'app.header.drawer.accesablePages.home' })}
          />
        </ListItemButton>
      </ListItem>
      {user && (
        <ListItem disablePadding onClick={toggleDrawer(false)}>
          <ListItemButton onClick={() => navigate(`/collections/owner/${user.id}`)}>
            <ListItemText
              primary={intl.formatMessage({
                id: 'app.header.drawer.accesablePages.userCollections',
              })}
            />
          </ListItemButton>
        </ListItem>
      )}
      {user && (
        <ListItem disablePadding onClick={toggleDrawer(false)}>
          <ListItemButton onClick={() => navigate('/collections')}>
            <ListItemText
              primary={intl.formatMessage({
                id: 'app.header.drawer.accesablePages.allCollections',
              })}
            />
          </ListItemButton>
        </ListItem>
      )}
      {user && user.role === Role.Admin && (
        <ListItem disablePadding onClick={toggleDrawer(false)}>
          <ListItemButton onClick={() => navigate('/users')}>
            <ListItemText
              primary={intl.formatMessage({ id: 'app.header.drawer.accesablePages.users' })}
            />
          </ListItemButton>
        </ListItem>
      )}
    </List>
  )
}
