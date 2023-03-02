import React from 'react'
import { Outlet } from 'react-router-dom'
import { Container } from '@mui/material'

export const Auth: React.FC = () => {
  return (
    <Container maxWidth='sm' sx={{ padding: { xs: 0, sm: 2 } }}>
      <Outlet />
    </Container>
  )
}
