import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../store'
import { createItem, updateItemById } from '../../store/slices/itemsSlice/itemsSlice'
import { useAdditionalFields } from '../../hooks/useAdditionalFileds'
import { FormattedMessage } from 'react-intl'
import { IModifyCollectionItemProps, MainFields } from './modifyCollectionItem.types'
import { CheckFilledAdditionalFields } from '../../utils/checkFilledAdditionalFields'
import { PrevPageButton } from '../shared/buttons/PrevPageButton'
import { Spinner } from '../shared/spinner/Spinner'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import { CollectionItemAdditionalFields } from './CollectionItemAdditionalFields'
import { CollectionItemForm } from './CollectionItemForm'

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
    values: {
      title: title,
      tags: tags,
    },
  })

  const { handleSubmit, formState, getValues } = methods

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

  return (
    <Container maxWidth='xl' sx={{ padding: { xs: 0 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <PrevPageButton />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Stack
          mb={2}
          spacing={2}
          component={'form'}
          onSubmit={handleSubmit(onSubmit)}
          sx={{ width: { xs: '100%', sm: '600px', md: '800px' }, position: 'relative' }}
        >
          <Typography variant='h4' component='h4' align='center'>
            {header}
          </Typography>
          <FormProvider {...methods}>
            <CollectionItemForm />
          </FormProvider>
          <Typography variant='h6' component='h6' align='center'>
            <FormattedMessage id='app.collectionItem.additionalFields.title' />
          </Typography>
          <CollectionItemAdditionalFields
            additionalFields={additionalFields}
            onChange={handleChangeAdditionalField}
          />
          <Button
            variant='contained'
            type='submit'
            disabled={!formState.isValid || !isFilledAdditionalFields}
            sx={{ alignSelf: 'flex-end' }}
          >
            <FormattedMessage id='app.buttons.save' />
          </Button>
          {isLoading && <Spinner />}
        </Stack>
      </Box>
    </Container>
  )
}
