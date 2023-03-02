import React, { useContext } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { useAppDispatch } from '../../../store'
import { authWithGoogle } from '../../../store/slices/authSlice/authSlice'
import Box from '@mui/material/Box'
import { GlobalContext } from '../../../contexts/GlobalContext'
import { useTheme } from '@mui/material/styles'
import { Themes } from '../../../models/Theme.model'

const GoogleAuthButton = () => {
  const { locale } = useContext(GlobalContext)
  const theme = useTheme()
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
        theme={theme.palette.mode === Themes.Dark ? 'filled_black' : 'filled_blue'}
        text='continue_with'
        size='medium'
        locale={locale}
        width='288'
      />
    </Box>
  )
}

export { GoogleAuthButton }
