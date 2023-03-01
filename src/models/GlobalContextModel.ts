enum Locales {
  EN = 'EN',
  RU = 'RU',
}

type TLocale = Locales.EN | Locales.RU

type TGlobalContext = {
  locale: TLocale
  setLocale: React.Dispatch<React.SetStateAction<TLocale>>
}

export { Locales }
export type { TGlobalContext, TLocale }
