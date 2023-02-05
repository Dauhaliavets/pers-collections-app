import React from 'react'
import { Alert, Box, Button, CircularProgress, Stack, TextField, Typography } from '@mui/material'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../store'
import { logIn } from '../../store/slices/authSlice'
import { useNavigate } from 'react-router-dom'

type LoginInputs = {
  username: string
  password: string
}

export const LoginForm: React.FC = () => {
  const { isAuth, isLoading, error } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<LoginInputs>({
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<LoginInputs> = (fields) => dispatch(logIn(fields))

  if (isAuth) navigate('/home')

  return (
    <Stack
      py={4}
      spacing={2}
      component={'form'}
      onSubmit={handleSubmit(onSubmit)}
      sx={{ position: 'relative' }}
    >
      <Typography variant='h4' component='h4' textAlign={'center'}>
        Authorization
      </Typography>
      <Controller
        name='username'
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <TextField {...field} label='Username' variant='outlined' autoComplete='off' />
        )}
      />
      <Controller
        name='password'
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <TextField
            {...field}
            label='Password'
            variant='outlined'
            type='password'
            autoComplete='off'
          />
        )}
      />
      <Button variant='contained' type='submit' disabled={!isValid}>
        Login
      </Button>
      {isLoading && (
        <Box
          sx={{
            backgroundColor: '#FFFFFF33',
            position: 'absolute',
            top: '0',
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress size={80} />
        </Box>
      )}
      {error && <Alert severity='error'>{error.message}</Alert>}
    </Stack>
  )
}
