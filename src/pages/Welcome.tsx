import React from 'react'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import { useNavigate } from 'react-router-dom'
import Link from '@mui/material/Link'
import { FormattedMessage } from 'react-intl'

export const Welcome: React.FC = () => {
  const navigate = useNavigate()

  return (
    <Paper
      sx={{
        marginTop: '20px',
        width: '100%',
        maxWidth: 'sm',
        padding: '40px',
        display: 'flex',
        justifyContent: 'center',
      }}
      elevation={2}
    >
      <Stack spacing={2} width={300}>
        <Button variant='contained' onClick={() => navigate('auth/login')}>
          <FormattedMessage id='app.buttons.login' />
        </Button>
        <Button variant='contained' onClick={() => navigate('auth/signup')}>
          <FormattedMessage id='app.buttons.registration' />
        </Button>
        <Link
          component='button'
          variant='body2'
          underline='none'
          onClick={() => {
            navigate('/home')
          }}
        >
          <FormattedMessage id='app.welcomePage.text.continue' />
        </Link>
      </Stack>
    </Paper>
  )
}
