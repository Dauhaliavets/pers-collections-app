import React from 'react'
import { Locales } from '../models/Locale.model'
import enMessages from '../i18n/en.json'
import ruMessages from '../i18n/ru.json'

const useLocale = () => {
  const [currentLocale, setCurrentLocale] = React.useState<Locales>(
    (localStorage.getItem('locale') as Locales) || Locales.En,
  )

  const setLocale = (value: Locales) => {
    setCurrentLocale(value)
    localStorage.setItem('locale', value)
  }

  const messages = {
    [Locales.En]: enMessages,
    [Locales.Ru]: ruMessages,
  }

  return { currentLocale, messages, setLocale }
}

export { useLocale }
