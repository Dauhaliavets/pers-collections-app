import { Locales, TLocale } from './Locale.model'

type TGlobalContext = {
  locale: TLocale
  setLocale: (value: Locales) => void
}

export type { TGlobalContext }
