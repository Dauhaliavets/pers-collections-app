import React, { useContext } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { GlobalContext } from '../../contexts/GlobalContext'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { Locales, Themes, TLocale } from '../../models/GlobalContextModel'
import { MaterialUISwitch } from '../material/materialUISwitch/MaterialUISwitch'

const Header: React.FC = () => {
  const { theme, setTheme, locale, setLocale } = useContext(GlobalContext)

  const handleChangeTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
    const theme = event.target.checked ? Themes.Dark : Themes.Light
    setTheme(theme)
    localStorage.setItem('theme', theme)
  }

  const handleChangeLocale = (event: SelectChangeEvent) => {
    setLocale(event.target.value as TLocale)
    localStorage.setItem('locale', locale)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            LOGO
          </Typography>
          <MaterialUISwitch
            sx={{ m: 1 }}
            checked={theme === Themes.Dark ? true : false}
            onChange={handleChangeTheme}
          />
          <Select
            value={locale}
            onChange={handleChangeLocale}
            sx={{ m: 1, minWidth: 70 }}
            size='small'
          >
            <MenuItem value={Locales.EN}>En</MenuItem>
            <MenuItem value={Locales.RU}>Ru</MenuItem>
          </Select>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export { Header }
