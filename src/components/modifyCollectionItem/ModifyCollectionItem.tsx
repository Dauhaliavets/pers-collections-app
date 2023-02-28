import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../store'
import { createItem, updateItemById } from '../../store/slices/itemsSlice/itemsSlice'
import { useAdditionalFields } from '../../hooks/useAdditionalFileds'
import { IModifyCollectionItemProps, MainFields } from './modifyCollectionItem.types'
import { CheckFilledAdditionalFields } from '../../utils/checkFilledAdditionalFields'
import { PrevPageButton } from '../shared/buttons/PrevPageButton'
import { FormElementSwitch } from '../shared/formElementSwitch/FormElementSwitch'
import { Spinner } from '../shared/spinner/Spinner'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { v4 as uuidv4 } from 'uuid'
import { fetchTagsByQuery } from '../../api/fetchTagsByQuery'

export const ModifyCollectionItem: React.FC<IModifyCollectionItemProps> = ({
  header,
  action,
  title = '',
  tags = [],
  extraFields = [],
}) => {
  const [options, setOptions] = React.useState<string[]>([])
  const { collectionId, itemId } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { additionalFields, handleChangeAdditionalField } = useAdditionalFields(extraFields)
  const { user } = useAppSelector((state) => state.auth)
  const { isLoading } = useAppSelector((state) => state.items)

  const isFilledAdditionalFields = CheckFilledAdditionalFields(additionalFields)

  const methods = useForm({
    values: {
      title: title,
      tags: tags,
    },
  })

  const { handleSubmit, formState, register, getValues, setValue } = methods

  const onSubmit: SubmitHandler<MainFields> = () => {
    const [title, tags] = getValues(['title', 'tags'])
    if (action === 'create') {
      if (collectionId && user && isFilledAdditionalFields) {
        const newBody = {
          collectionId,
          title: title,
          tags: tags,
          extraFields: additionalFields,
        }

        dispatch(createItem({ token: user.token, body: newBody })).then(() =>
          navigate(`/collections/${collectionId}`),
        )
      }
    }

    if (action === 'edit') {
      if (user && itemId && isFilledAdditionalFields) {
        const newBody = {
          title: title,
          tags: tags,
          extraFields: additionalFields,
        }

        dispatch(updateItemById({ id: itemId, token: user.token, newBody })).then(() =>
          navigate(`/collections/${collectionId}`),
        )
      }
    }
  }

  const handleInputChange = async (value: string) => {
    if (value.length > 2) {
      const tags = await fetchTagsByQuery(value)
      const filterTags = [...new Set(tags)]
      setOptions(filterTags)
    } else {
      setOptions([])
    }
  }

  return (
    <Stack spacing={3} sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <PrevPageButton />
      </Box>
      <Typography variant='h5' component='h5' align='center'>
        {header}
      </Typography>
      <Stack
        component={'form'}
        onSubmit={handleSubmit(onSubmit)}
        spacing={1}
        sx={{ position: 'relative' }}
      >
        <FormProvider {...methods}>
          <TextField
            {...register('title')}
            label={'Title'}
            type={'text'}
            variant='outlined'
            autoComplete='off'
          />

          <Autocomplete
            {...register('tags')}
            sx={{ width: '100%', '& .MuiSvgIcon-root': { color: '#ffffff' } }}
            onInputChange={(_, newValue) => handleInputChange(newValue)}
            multiple
            freeSolo
            clearOnBlur={false}
            options={options}
            getOptionLabel={(option) => option}
            renderOption={(props, option) => {
              return (
                <li key={uuidv4()} {...props}>
                  {option}
                </li>
              )
            }}
            renderInput={(params) => <TextField {...params} label='Tags' />}
            onChange={(_, newValue) => setValue('tags', newValue)}
          />
        </FormProvider>
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
            <FormElementSwitch field={field} handleChange={handleChangeAdditionalField} />
          </Box>
        ))}
        <Button
          variant='contained'
          type='submit'
          disabled={!formState.isValid || !isFilledAdditionalFields}
          sx={{ alignSelf: 'flex-end' }}
        >
          Save
        </Button>
        {isLoading && <Spinner />}
      </Stack>
    </Stack>
  )
}
