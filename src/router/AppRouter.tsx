import React from 'react'
import { useAppSelector } from '../store'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from '../components/header/Header'
import { Auth } from '../pages/Auth'
import { LoginForm } from '../components/auth/LoginForm'
import { SignUpForm } from '../components/auth/SignUpForm'
import { AdminPage } from '../pages/AdminPage'
import { Welcome } from '../pages/Welcome'
import { HomePage } from '../pages/HomePage'
import { UserCollections } from '../pages/UserCollections'
import { CreateCollection } from '../pages/CreateCollection'
import { EditCollection } from '../pages/EditCollection'
import { CollectionDetails } from '../pages/CollectionDetails'
import { CollectionItemDetails } from '../pages/CollectionItemDetails'
import { CreateCollectionItem } from '../pages/CreateCollectionItem'
import { EditCollectionItem } from '../pages/EditCollectionItem'
import { SearchResults } from '../pages/SearchResults'
import { Collections } from '../pages/Collections'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import { ProtectedRoute } from './ProtectedRoute'
import { NotFoundPage } from '../pages/NotFoundPage'

export const AppRouter = () => {
  const { isAuth } = useAppSelector((state) => state.auth)

  return (
    <BrowserRouter>
      <CssBaseline />
      <Header />
      <Container
        maxWidth='xl'
        sx={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          padding: '30px 16px',
        }}
      >
        <Routes>
          <Route path='/' element={<Welcome />} />
          <Route path='auth' element={<Auth />}>
            <Route path='login' element={<LoginForm />} />
            <Route path='signup' element={<SignUpForm />} />
          </Route>
          <Route path='home' element={<HomePage />} />
          <Route path='search' element={<SearchResults />} />
          <Route path='collections' element={<Collections />} />
          <Route
            path='collections/owner/:ownerId'
            element={
              <ProtectedRoute isAuth={isAuth}>
                <UserCollections />
              </ProtectedRoute>
            }
          />
          <Route
            path='collections/create'
            element={
              <ProtectedRoute isAuth={isAuth} redirectPath={'/auth/login'}>
                <CreateCollection />
              </ProtectedRoute>
            }
          />
          <Route path='collections/:collectionId' element={<CollectionDetails />} />
          <Route
            path='collections/:collectionId/edit'
            element={
              <ProtectedRoute isAuth={isAuth} redirectPath={'/auth/login'}>
                <EditCollection />
              </ProtectedRoute>
            }
          />
          <Route
            path='collections/:collectionId/createItem'
            element={
              <ProtectedRoute isAuth={isAuth} redirectPath={'/auth/login'}>
                <CreateCollectionItem />
              </ProtectedRoute>
            }
          />
          <Route
            path='collections/:collectionId/items/:itemId'
            element={<CollectionItemDetails />}
          />
          <Route
            path='collections/:collectionId/items/:itemId/edit'
            element={
              <ProtectedRoute isAuth={isAuth} redirectPath={'/auth/login'}>
                <EditCollectionItem />
              </ProtectedRoute>
            }
          />
          <Route
            path='users'
            element={
              <ProtectedRoute isAuth={isAuth} redirectPath={'/auth/login'}>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}
