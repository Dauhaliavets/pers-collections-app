import React from 'react'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import { useNavigate } from 'react-router-dom'
import Link from '@mui/material/Link'

export const Welcome: React.FC = () => {
  const navigate = useNavigate()

  return (
    <Paper
      sx={{ marginTop: '20px', width: '100%', maxWidth: '400px', padding: '20px' }}
      elevation={3}
    >
      <Stack spacing={2}>
        <Button variant='contained' onClick={() => navigate('auth/login')}>
          Login
        </Button>
        <Button variant='contained' onClick={() => navigate('auth/signup')}>
          Registration
        </Button>
        <Link
          component='button'
          variant='body2'
          underline='none'
          onClick={() => {
            navigate('/home')
          }}
        >
          Continue as guest
        </Link>
      </Stack>
    </Paper>
  )
}
