import React from 'react'
import { useNavigate } from 'react-router-dom'
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form'
import { FormattedMessage, useIntl } from 'react-intl'
import { GoogleAuthButton } from './GoogleAuthButton'
import { useAppDispatch, useAppSelector } from '../../store'
import { logIn } from '../../store/slices/authSlice/authSlice'
import { authFormValidationRules } from '../../constants/authFormValidationRules'
import { LoginInputs } from './authForm.types'
import { Spinner } from '../shared/spinner/Spinner'
import { FormInputText } from '../shared/formComponents/FormInputText'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

export const LoginForm: React.FC = () => {
  const { isAuth, isLoading, error } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const intl = useIntl()

  const methods = useForm<LoginInputs>({
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const {
    handleSubmit,
    formState: { isValid },
  } = methods

  const onSubmit: SubmitHandler<LoginInputs> = (fields) => {
    if (isValid) {
      dispatch(logIn(fields))
    }
  }

  React.useEffect(() => {
    if (isAuth) navigate('/home')
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
        <FormattedMessage id='app.auth.loginForm.title' />
      </Typography>
      <FormProvider {...methods}>
        <FormInputText
          name={'username'}
          label={intl.formatMessage({ id: 'app.auth.loginForm.nameField.label' })}
          rules={authFormValidationRules.username}
        />
        <FormInputText
          name={'password'}
          label={intl.formatMessage({ id: 'app.auth.loginForm.passwordField.label' })}
          type={'password'}
          rules={authFormValidationRules.password}
        />
      </FormProvider>
      <Button variant='contained' type='submit'>
        <FormattedMessage id='app.buttons.login' />
      </Button>
      {isLoading && <Spinner />}
      {error && <Alert severity='error'>{error.message}</Alert>}
      <GoogleAuthButton />
    </Stack>
  )
}
