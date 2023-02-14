import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store'
import { useAdditionalFields } from '../hooks/useAdditionalFileds'
import { Box, Button, TextField } from '@mui/material'
import Stack from '@mui/material/Stack'
import { ElementSwitcher } from '../components/shared/elementSwitcher/ElementSwitcher'
import { PrevPageButton } from '../components/shared/buttons/PrevPageButton'
import { updateItemById } from '../store/slices/itemsSlice/itemsSlice'

export const EditCollectionItem = () => {
  const { collectionId, itemId } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const {
    title: defaultTitle,
    tags: defaultTags,
    extraFields,
  } = useAppSelector((state) => state.items.items.filter((item) => item._id === itemId)[0])
  const [title, setTitle] = React.useState<string>(defaultTitle || '')
  const [tags, setTags] = React.useState<string[]>(defaultTags || [])

  const { additionalFields, handleChangeAdditionalField } = useAdditionalFields(extraFields || [])
  const { user } = useAppSelector((state) => state.auth)

  const onSubmit = () => {
    if (title.length && tags.length && additionalFields?.every((field) => field.value !== '')) {
      const newBody = {
        title,
        tags,
        extraFields: additionalFields,
      }

      dispatch(updateItemById({ id: itemId as string, token: user?.token as string, newBody }))
      navigate(`/collections/${collectionId}`)
    } else {
      console.log('Sorry, your fields not filled')
    }
  }

  return (
    <Stack spacing={3}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <PrevPageButton />
        <div>Create Collection Item</div>
      </Box>
      <TextField
        id='title-input'
        label='Title'
        variant='outlined'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <TextField
        id='tags-input'
        label='Tags'
        variant='outlined'
        value={tags}
        onChange={(e) => setTags([e.target.value])}
        required
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
      <Button variant='contained' onClick={onSubmit}>
        Update
      </Button>
    </Stack>
  )
}
