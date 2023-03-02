import React from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { useAppDispatch } from '../../store'
import { authWithGoogle } from '../../store/slices/authSlice/authSlice'
import Box from '@mui/material/Box'

const GoogleAuthButton = () => {
  const dispatch = useAppDispatch()

  const onSuccessAuth = (credential: string) => {
    dispatch(authWithGoogle({ credential }))
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          if (credentialResponse.credential) {
            onSuccessAuth(credentialResponse.credential)
          }
        }}
        onError={() => {
          console.log('Login Failed')
        }}
        theme='outline'
        text='continue_with'
        size='medium'
      />
    </Box>
  )
}

export { GoogleAuthButton }
