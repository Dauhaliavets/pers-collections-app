import { createContext } from 'react'
import { Locales, TGlobalContext, Themes } from '../models/GlobalContextModel'

const defaultGlobalContext = {
  theme: Themes.Light,
  setTheme: () => {},
  locale: Locales.EN,
  setLocale: () => {},
}

const GlobalContext = createContext<TGlobalContext>(defaultGlobalContext)

export { GlobalContext }
