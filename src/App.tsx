import React from 'react'
import { Provider } from 'react-redux'
import { GlobalContext } from './contexts/GlobalContext'
import store from './store'
import { ColorModeContext, useThemeMode } from './hooks/useTheme'
import { IntlProvider } from 'react-intl'
import { useLocale } from './hooks/useLocale'
import { ThemeProvider } from '@mui/material/styles'
import { AppRouter } from './router/AppRouter'

function App() {
  const { theme, colorMode } = useThemeMode()
  const { currentLocale, messages, setLocale } = useLocale()

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <GlobalContext.Provider value={{ locale: currentLocale, setLocale }}>
            <IntlProvider locale={currentLocale} messages={messages[currentLocale]}>
              <AppRouter />
            </IntlProvider>
          </GlobalContext.Provider>
        </Provider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App
