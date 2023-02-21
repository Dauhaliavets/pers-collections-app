import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../store'
import { createItem, updateItemById } from '../../store/slices/itemsSlice/itemsSlice'
import { useAdditionalFields } from '../../hooks/useAdditionalFileds'
import { IModifyCollectionItemProps, MainFields } from './modifyCollectionItem.types'
import { getSubstrings } from '../../utils/getSubstrings'
import { CheckFilledAdditionalFields } from '../../utils/checkFilledAdditionalFields'
import { PrevPageButton } from '../shared/buttons/PrevPageButton'
import { FormElementSwitch } from '../shared/formElementSwitch/FormElementSwitch'
import { Spinner } from '../shared/spinner/Spinner'
import { FormInputText } from '../shared/formComponents/FormInputText'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

export const ModifyCollectionItem: React.FC<IModifyCollectionItemProps> = ({
  header,
  action,
  title = '',
  tags = [],
  extraFields = [],
}) => {
  const { collectionId, itemId } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { additionalFields, handleChangeAdditionalField } = useAdditionalFields(extraFields)
  const { user } = useAppSelector((state) => state.auth)
  const { isLoading } = useAppSelector((state) => state.items)

  const isFilledAdditionalFields = CheckFilledAdditionalFields(additionalFields)

  const methods = useForm({
    defaultValues: {
      title: title,
      tags: tags.join(' '),
    },
  })

  const {
    handleSubmit,
    formState: { isValid },
  } = methods

  const onSubmit: SubmitHandler<MainFields> = (mainFields) => {
    if (action === 'create') {
      if (collectionId && user && isFilledAdditionalFields) {
        const newBody = {
          collectionId,
          title: mainFields.title,
          tags: getSubstrings(mainFields.tags),
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
          title: mainFields.title,
          tags: getSubstrings(mainFields.tags),
          extraFields: additionalFields,
        }

        dispatch(updateItemById({ id: itemId, token: user.token, newBody })).then(() =>
          navigate(`/collections/${collectionId}`),
        )
      }
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
          <FormInputText name={'title'} label={'Title'} />
          <FormInputText name={'tags'} label={'Tags'} />
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
          disabled={!isValid || !isFilledAdditionalFields}
          sx={{ alignSelf: 'flex-end' }}
        >
          Save
        </Button>
        {isLoading && <Spinner />}
      </Stack>
    </Stack>
  )
}
