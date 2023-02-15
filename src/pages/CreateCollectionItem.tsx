import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store'
import { useAdditionalFields } from '../hooks/useAdditionalFileds'
import { Box, Button, TextField, Typography } from '@mui/material'
import Stack from '@mui/material/Stack'
import { ElementSwitcher } from '../components/shared/elementSwitcher/ElementSwitcher'
import { createItem } from '../store/slices/itemsSlice/itemsSlice'
import { PrevPageButton } from '../components/shared/buttons/PrevPageButton'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

type MainFields = {
  title: string
  tags: string
}

export const CreateCollectionItem = () => {
  const { collectionId } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [collection] = useAppSelector((state) =>
    state.collections.collections.filter((collection) => collection._id === collectionId),
  )
  const { extraFields } = collection
  const { additionalFields, handleChangeAdditionalField } = useAdditionalFields(extraFields || [])
  const { user } = useAppSelector((state) => state.auth)

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      title: '',
      tags: '',
    },
  })

  const onSubmit: SubmitHandler<MainFields> = (mainFields) => {
    if (collectionId && user) {
      const newBody = {
        collectionId,
        title: mainFields.title,
        tags: mainFields.tags.split(' '),
        extraFields: additionalFields,
      }

      dispatch(createItem({ token: user.token, body: newBody }))
      navigate(`/collections/${collectionId}`)
    }
  }

  return (
    <Stack spacing={2} sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <PrevPageButton />
      </Box>
      <Typography variant='h5' component='h5' align='center'>
        Create Item
      </Typography>
      <Stack component={'form'} onSubmit={handleSubmit(onSubmit)} spacing={1}>
        <Controller
          name='title'
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { ref, ...field } }) => (
            <TextField
              {...field}
              inputRef={ref}
              id='title'
              error={!!errors.title}
              label='Title'
              variant='outlined'
              autoComplete='off'
            />
          )}
        />
        <Controller
          name='tags'
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { ref, ...field } }) => (
            <TextField
              {...field}
              inputRef={ref}
              id='tags'
              error={!!errors.tags}
              label='Tags'
              variant='outlined'
              autoComplete='off'
            />
          )}
        />
        {additionalFields.map((field, i) => (
          <Box
            key={i}
            py={1}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <ElementSwitcher field={field} handleChange={handleChangeAdditionalField} />
          </Box>
        ))}
        <Button
          variant='contained'
          type='submit'
          disabled={!isValid}
          sx={{ alignSelf: 'flex-end' }}
        >
          Create
        </Button>
      </Stack>
    </Stack>
  )
}
