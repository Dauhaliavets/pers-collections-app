import React from 'react'
import Container from '@mui/material/Container'
import { Header } from './components/header/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Auth } from './pages/Auth'
import { LoginForm } from './components/login/LoginForm'
import { SignUpForm } from './components/signup/SignUpForm'
import { Welcome } from './pages/Welcome'

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Container maxWidth='lg' sx={{ display: 'flex', justifyContent: 'center' }}>
          <Routes>
            <Route path='/' element={<Welcome />} />
            <Route path='auth' element={<Auth />}>
              <Route path='login' element={<LoginForm />} />
              <Route path='signup' element={<SignUpForm />} />
            </Route>
            {/* <Route path='posts' element={<Posts />}>
            <Route path='new' element={<NewPost />} />
            <Route path=':postId' element={<Post />} />
          </Route> */}
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  )
}

export default App
