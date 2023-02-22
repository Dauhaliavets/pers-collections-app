import React from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../store'
import { createItemComment } from '../../store/slices/itemsSlice/itemsSlice'
import { ICommentFormProps, TCommentForm } from './itemDetails.types'
import { FormInputTextarea } from '../shared/formComponents/FormInputTextarea'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

export const CommentForm: React.FC<ICommentFormProps> = ({ itemId }) => {
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
