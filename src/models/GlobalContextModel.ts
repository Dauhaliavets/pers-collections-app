enum Themes {
  Light = 'light',
  Dark = 'dark',
}

enum Locales {
  EN = 'EN',
  RU = 'RU',
}

type TTheme = Themes.Light | Themes.Dark
type TLocale = Locales.EN | Locales.RU

type TGlobalContext = {
  theme: TTheme
  setTheme: React.Dispatch<React.SetStateAction<TTheme>>
  locale: TLocale
  setLocale: React.Dispatch<React.SetStateAction<TLocale>>
}

export { Themes, Locales }
export type { TGlobalContext, TTheme, TLocale }
