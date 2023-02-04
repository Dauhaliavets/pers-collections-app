import { Button, Stack, TextField } from '@mui/material'
import React from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { signUp } from '../../services/auth-service'

type SignUpInputs = {
  username: string
  email: string
  password: string
}

export const SignUpForm = () => {
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

  const onSubmit: SubmitHandler<SignUpInputs> = (fields) => signUp(fields)
  return (
    <Stack py={4} spacing={2} component={'form'} onSubmit={handleSubmit(onSubmit)}>
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
    </Stack>
  )
}
