import React from 'react'
import { createTheme } from '@mui/material/styles'
import { Themes } from '../models/Theme.model'

const ColorModeContext = React.createContext({ toggleColorMode: () => {} })

const useThemeMode = () => {
  const [mode, setMode] = React.useState<Themes>(
    (localStorage.getItem('theme') as Themes) || Themes.Light,
  )
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
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
        },
      }),
    [mode],
  )

  return { theme, colorMode }
}

export { useThemeMode, ColorModeContext }
