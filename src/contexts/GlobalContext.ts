import { createContext } from 'react'
import { Locales, TGlobalContext } from '../models/GlobalContextModel'

const defaultGlobalContext = {
  locale: Locales.EN,
  setLocale: () => {},
}

const GlobalContext = createContext<TGlobalContext>(defaultGlobalContext)

export { GlobalContext }
