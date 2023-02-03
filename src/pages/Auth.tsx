import React from 'react'
import { Outlet } from 'react-router-dom'
import { Container } from '@mui/material'

export const Auth: React.FC = () => {
  return (
    <Container maxWidth='sm'>
      <Outlet />
    </Container>
  )
}
