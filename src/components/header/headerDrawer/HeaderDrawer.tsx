import React from 'react'

import Drawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import { Divider, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { DrawerHeader } from './styled'
import { SettingsList } from './settingsList/SettingsList'
import { AuthOptions } from './authOptions/AuthOptions'
import { AccessiblePagesList } from './accessiblePagesList/AccessiblePagesList'

export const HeaderDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)

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
    <Box sx={{ display: 'flex', order: { sm: 2, xs: 1 } }}>
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
          <AccessiblePagesList toggleDrawer={toggleDrawer} />
          <Divider />
          <SettingsList />
          <Divider />
          <AuthOptions toggleDrawer={toggleDrawer} />
        </Box>
      </Drawer>
    </Box>
  )
}
