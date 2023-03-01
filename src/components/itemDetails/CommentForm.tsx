import React from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store'
import { createItemComment, updateItemFromSocket } from '../../store/slices/itemsSlice/itemsSlice'
import { TCommentForm } from './itemDetails.types'
import { FormInputTextarea } from '../shared/formComponents/FormInputTextarea'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import io from 'socket.io-client'
import { API_URL } from '../../constants/api'
import { Typography } from '@mui/material'
import { FormattedMessage, useIntl } from 'react-intl'

const socket = io(API_URL)

export const CommentForm: React.FC = () => {
  const { itemId } = useParams()
  const { user, isAuth } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const intl = useIntl()

  const methods = useForm<TCommentForm>({
    defaultValues: {
      commentBody: '',
    },
  })

  const { handleSubmit, reset } = methods

  const onSubmit: SubmitHandler<TCommentForm> = (formData) => {
    if (itemId && user) {
      const commentBody = {
        sender: user.username,
        text: formData.commentBody,
        createdDate: new Date().toISOString(),
      }

      dispatch(createItemComment({ id: itemId, token: user.token, commentBody }))
      reset()
    }
  }

  React.useEffect(() => {
    socket.on('new-comment', (data) => dispatch(updateItemFromSocket(data)))

    return () => {
      socket.off('new-comment')
    }
  }, [])

  if (!isAuth)
    return (
      <Typography>
        <FormattedMessage id='app.collectionItemDetails.comments.unauthorazedMessage' />
        <Link to={'/'}>
          <FormattedMessage id='app.collectionItemDetails.comments.unauthorazedMessage.link' />
        </Link>
      </Typography>
    )

  return (
    <Box
      component={'form'}
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: 'flex', flexDirection: 'column', gap: 1, minWidth: 400 }}
    >
      <FormProvider {...methods}>
        <FormInputTextarea
          name={'commentBody'}
          label={intl.formatMessage({ id: 'app.collectionItemDetails.comments.form.name' })}
        />
      </FormProvider>
      <Button variant='contained' type='submit' sx={{ alignSelf: 'flex-end' }}>
        <FormattedMessage id='app.collectionItemDetails.comments.submitButton' />
      </Button>
    </Box>
  )
}
