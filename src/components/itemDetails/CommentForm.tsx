import React from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store'
import { createItemComment, updateItemFromSocket } from '../../store/slices/itemsSlice/itemsSlice'
import { TCommentForm } from './itemDetails.types'
import { FormInputTextarea } from '../shared/formComponents/FormInputTextarea'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import io from 'socket.io-client'
import { API_URL } from '../../constants/api'

const socket = io(API_URL)

export const CommentForm: React.FC = () => {
  const { itemId } = useParams()
  const { user } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

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

  return (
    <Box
      component={'form'}
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: 'flex', flexDirection: 'column', gap: 1, minWidth: 400 }}
    >
      <FormProvider {...methods}>
        <FormInputTextarea name={'commentBody'} label={'Comment'} />
      </FormProvider>
      <Button variant='contained' type='submit' sx={{ alignSelf: 'flex-end' }}>
        Post comment
      </Button>
    </Box>
  )
}
