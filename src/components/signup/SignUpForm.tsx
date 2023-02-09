import React from 'react'
import { Alert, Button, Stack, TextField, Typography } from '@mui/material'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../store'
import { signUp } from '../../store/slices/authSlice/authSlice'
import { Spinner } from '../spinner/Spinner'
import { useNavigate } from 'react-router-dom'

type SignUpInputs = {
  username: string
  email: string
  password: string
}

export const SignUpForm: React.FC = () => {
  const { isAuth, isLoading, error } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<SignUpInputs>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<SignUpInputs> = (fields) => dispatch(signUp(fields))

  React.useEffect(() => {
    if (isAuth) navigate('/collections')
  }, [isAuth])

  return (
    <Stack
      py={4}
      spacing={2}
      component={'form'}
      onSubmit={handleSubmit(onSubmit)}
      sx={{ position: 'relative' }}
    >
      <Typography variant='h4' component='h4' textAlign={'center'}>
        Registration
      </Typography>
      <Controller
        name='username'
        control={control}
        rules={{
          required: true,
          minLength: { value: 3, message: 'Username min Length 3' },
          maxLength: { value: 15, message: 'Username max Length 15' },
        }}
        render={({ field }) => (
          <TextField {...field} label='Username' variant='outlined' autoComplete='off' />
        )}
      />
      <Controller
        name='email'
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <TextField
            {...field}
            label='Email'
            variant='outlined'
            type={'email'}
            autoComplete='off'
          />
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
      {isLoading && <Spinner />}
      {error && <Alert severity='error'>error.message</Alert>}
    </Stack>
  )
}
