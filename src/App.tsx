import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Locales, Themes } from './models/GlobalContextModel'
import { GlobalContext } from './contexts/GlobalContext'
import store from './store'

import { Header } from './components/header/Header'
import { Auth } from './pages/Auth'
import { LoginForm } from './components/auth/LoginForm'
import { SignUpForm } from './components/auth/SignUpForm'
import { AdminPage } from './pages/AdminPage'
import { Welcome } from './pages/Welcome'
import { HomePage } from './pages/HomePage'
import { UserCollections } from './pages/UserCollections'
import { CreateCollection } from './pages/CreateCollection'
import { EditCollection } from './pages/EditCollection'
import { CollectionDetails } from './pages/CollectionDetails'
import { CollectionItemDetails } from './pages/CollectionItemDetails'
import { CreateCollectionItem } from './pages/CreateCollectionItem'
import { EditCollectionItem } from './pages/EditCollectionItem'
import { SearchResults } from './pages/SearchResults'

import Container from '@mui/material/Container'

function App() {
  const [theme, setTheme] = React.useState<Themes>(
    (localStorage.getItem('theme') as Themes) || Themes.Light,
  )
  const [locale, setLocale] = React.useState<Locales>(
    (localStorage.getItem('locale') as Locales) || Locales.EN,
  )
  return (
    <Provider store={store}>
      <GlobalContext.Provider value={{ theme, setTheme, locale, setLocale }}>
        <BrowserRouter>
          <Header />
          <Container
            maxWidth='xl'
            sx={{ display: 'flex', justifyContent: 'center', padding: '20px 0' }}
          >
            <Routes>
              <Route path='/' element={<Welcome />} />
              <Route path='auth' element={<Auth />}>
                <Route path='login' element={<LoginForm />} />
                <Route path='signup' element={<SignUpForm />} />
              </Route>
              <Route path='home' element={<HomePage />} />
              <Route path='search' element={<SearchResults />} />
              <Route path='collections' element={<UserCollections />} />
              <Route path='collections/create' element={<CreateCollection />} />
              <Route path='collections/:collectionId' element={<CollectionDetails />} />
              <Route path='collections/:collectionId/edit' element={<EditCollection />} />
              <Route
                path='collections/:collectionId/createItem'
                element={<CreateCollectionItem />}
              />
              <Route
                path='collections/:collectionId/items/:itemId'
                element={<CollectionItemDetails />}
              />
              <Route
                path='collections/:collectionId/items/:itemId/edit'
                element={<EditCollectionItem />}
              />
              <Route path='users' element={<AdminPage />} />
            </Routes>
          </Container>
        </BrowserRouter>
      </GlobalContext.Provider>
    </Provider>
  )
}

export default App
