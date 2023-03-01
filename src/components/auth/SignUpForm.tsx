import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../store'
import { signUp } from '../../store/slices/authSlice/authSlice'
import { authFormValidationRules } from '../../constants/authFormValidationRules'
import { SignUpInputs } from './authForm.types'
import { Spinner } from '../shared/spinner/Spinner'
import { FormInputText } from '../shared/formComponents/FormInputText'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { FormattedMessage, useIntl } from 'react-intl'

export const SignUpForm: React.FC = () => {
  const { isAuth, isLoading, error } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const intl = useIntl()

  const methods = useForm<SignUpInputs>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  })

  const {
    handleSubmit,
    formState: { isValid },
  } = methods

  const onSubmit: SubmitHandler<SignUpInputs> = (fields) => {
    if (isValid) {
      dispatch(signUp(fields))
    }
  }

  React.useEffect(() => {
    if (isAuth) navigate('/home')
  }, [isAuth])

  return (
    <Stack
      py={4}
      spacing={3}
      component={'form'}
      onSubmit={handleSubmit(onSubmit)}
      sx={{ position: 'relative' }}
    >
      <Typography variant='h4' component='h4' textAlign={'center'}>
        <FormattedMessage id='app.auth.signUp.title' />
      </Typography>
      <FormProvider {...methods}>
        <FormInputText
          name={'username'}
          label={intl.formatMessage({ id: 'app.auth.signUp.nameField.label' })}
          rules={authFormValidationRules.username}
        />
        <FormInputText
          name={'email'}
          label={intl.formatMessage({ id: 'app.auth.signUp.emailField.label' })}
          type={'email'}
          rules={authFormValidationRules.email}
        />
        <FormInputText
          name={'password'}
          label={intl.formatMessage({ id: 'app.auth.signUp.passwordField.label' })}
          type={'password'}
          rules={authFormValidationRules.password}
        />
      </FormProvider>
      <Button variant='contained' type='submit'>
        <FormattedMessage id='app.buttons.signup' />
      </Button>
      {isLoading && <Spinner />}
      {error && <Alert severity='error'>error.message</Alert>}
    </Stack>
  )
}
