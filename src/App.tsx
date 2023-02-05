import React, { useState } from 'react'
import Container from '@mui/material/Container'
import { Header } from './components/header/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Auth } from './pages/Auth'
import { LoginForm } from './components/login/LoginForm'
import { SignUpForm } from './components/signup/SignUpForm'
import { Welcome } from './pages/Welcome'
import { Home } from './pages/Home'
import { GlobalContext } from './contexts/GlobalContext'
import { Locales, Themes } from './models/GlobalContextModel'
import { Provider } from 'react-redux'
import store from './store'
import { AdminPage } from './pages/AdminPage'

function App() {
  const [theme, setTheme] = useState<Themes>(
    (localStorage.getItem('theme') as Themes) || Themes.Light,
  )
  const [locale, setLocale] = useState<Locales>(
    (localStorage.getItem('locale') as Locales) || Locales.EN,
  )
  return (
    <Provider store={store}>
      <GlobalContext.Provider value={{ theme, setTheme, locale, setLocale }}>
        <BrowserRouter>
          <Header />
          <Container
            maxWidth='lg'
            sx={{ display: 'flex', justifyContent: 'center', padding: '20px 0' }}
          >
            <Routes>
              <Route path='/' element={<Welcome />} />
              <Route path='auth' element={<Auth />}>
                <Route path='login' element={<LoginForm />} />
                <Route path='signup' element={<SignUpForm />} />
              </Route>
              <Route path='home' element={<Home />} />
              <Route path='adminPage' element={<AdminPage />} />
            </Routes>
          </Container>
        </BrowserRouter>
      </GlobalContext.Provider>
    </Provider>
  )
}

export default App
