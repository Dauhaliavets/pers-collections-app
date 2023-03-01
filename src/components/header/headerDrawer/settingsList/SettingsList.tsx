import React from 'react'
import { GlobalContext } from '../../../../contexts/GlobalContext'
// import { Locales, TLocale } from '../../../../models/GlobalContextModel'
import { Themes } from '../../../../models/Theme.model'
import { MaterialUISwitch } from '../../../shared/switch/materialUIswitch'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { useTheme } from '@mui/material/styles'
import { ColorModeContext } from '../../../../hooks/useTheme'
import { FormattedMessage } from 'react-intl'
import { Locales, TLocale } from '../../../../models/Locale.model'

export const SettingsList = () => {
  const { locale, setLocale } = React.useContext(GlobalContext)
  const theme = useTheme()
  const colorMode = React.useContext(ColorModeContext)

  const handleChangeTheme = () => {
    colorMode.toggleColorMode()
  }

  const handleChangeLocale = (event: SelectChangeEvent) => {
    setLocale(event.target.value as TLocale)
  }

  return (
    <List sx={{ padding: '8px 16px' }}>
      <ListItem disablePadding>
        <ListItemText>
          <FormattedMessage id='app.header.drawer.settings.theme' />
        </ListItemText>
        <MaterialUISwitch
          sx={{ m: 1 }}
          checked={theme.palette.mode === Themes.Dark ? true : false}
          onChange={handleChangeTheme}
        />
      </ListItem>
      <ListItem disablePadding>
        <ListItemText>
          <FormattedMessage id='app.header.drawer.settings.language' />
        </ListItemText>
        <Select value={locale} onChange={handleChangeLocale} sx={{ minWidth: 100 }} size='small'>
          <MenuItem value={Locales.En}>En</MenuItem>
          <MenuItem value={Locales.Ru}>Ru</MenuItem>
        </Select>
      </ListItem>
    </List>
  )
}
