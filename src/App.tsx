import React, { useState } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Locales, Themes } from './models/GlobalContextModel'
import { GlobalContext } from './contexts/GlobalContext'
import store from './store'
import { Header } from './components/header/Header'
import { LoginForm } from './components/login/LoginForm'
import { SignUpForm } from './components/signup/SignUpForm'
import { Users } from './pages/Users'
import { Auth } from './pages/Auth'
import { Welcome } from './pages/Welcome'
import { Collections } from './pages/Collections'
import Container from '@mui/material/Container'
import { CreateCollection } from './components/createCollection/CreateCollection'

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
              <Route path='collections' element={<Collections />} />
              <Route path='collections/create' element={<CreateCollection />} />
              <Route path='users' element={<Users />} />
            </Routes>
          </Container>
        </BrowserRouter>
      </GlobalContext.Provider>
    </Provider>
  )
}

export default App
