import { createContext } from 'react'
import { TGlobalContext } from '../models/GlobalContextModel'
import { Locales } from '../models/Locale.model'

const defaultGlobalContext = {
  locale: Locales.En,
  setLocale: () => {},
}

const GlobalContext = createContext<TGlobalContext>(defaultGlobalContext)

export { GlobalContext }
