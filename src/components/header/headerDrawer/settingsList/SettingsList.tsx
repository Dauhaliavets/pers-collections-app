import React from 'react'
import { GlobalContext } from '../../../../contexts/GlobalContext'
import { Locales, Themes, TLocale } from '../../../../models/GlobalContextModel'

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { MaterialUISwitch } from '../../../material/switch/switch'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

export const SettingsList = () => {
  const { theme, setTheme, locale, setLocale } = React.useContext(GlobalContext)

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
        <Select value={locale} onChange={handleChangeLocale} sx={{ minWidth: 150 }} size='small'>
          <MenuItem value={Locales.EN}>En</MenuItem>
          <MenuItem value={Locales.RU}>Ru</MenuItem>
        </Select>
      </ListItem>
    </List>
  )
}
