import React from 'react'
import { createTheme } from '@mui/material/styles'
import { Themes } from '../models/Theme.model'
import { PaletteMode } from '@mui/material'

const ColorModeContext = React.createContext({ toggleColorMode: () => {} })

const useThemeMode = () => {
  const [mode, setMode] = React.useState<Themes>(
    (localStorage.getItem('theme') as Themes) || Themes.Light,
  )

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) => {
          const newMode = prevMode === Themes.Light ? Themes.Dark : Themes.Light
          localStorage.setItem('theme', newMode)
          return newMode
        })
      },
    }),
    [],
  )

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#3ab4e3',
          },
        },
      }),
    [mode],
  )

  return { theme, colorMode }
}

export { useThemeMode, ColorModeContext }
