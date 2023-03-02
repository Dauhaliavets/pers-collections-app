import React from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store'
import {
  createCollection,
  updateCollectionById,
} from '../../store/slices/collectionsSlice/collectionsSlice'
import { topics } from '../../constants/topics'
import { useAdditionalFields } from '../../hooks/useAdditionalFileds'
import { CollectionForm, IModifyCollection } from './modifyCollection.types'
import { DialogMenu } from './dialogMenu/DialogMenu'
import { DropZone } from './dropZone/DropZone'
import { CollectionAdditionalFields } from './collectionAdditionalFields/CollectionAdditionalFields'
import { TabPanel } from './tabPanel/TabPanel'
import { Spinner } from '../shared/spinner/Spinner'
import { FormInputText } from '../shared/formComponents/FormInputText'
import { FormInputTextarea } from '../shared/formComponents/FormInputTextarea'
import { PrevPageButton } from '../shared/buttons/PrevPageButton'
import { FormInputDropdown } from '../shared/formComponents/FormInputDropdown'
import { FormOutputMarkdown } from '../shared/formComponents/FormOutputMarkdown'
import { collectionFormValidationRules as validationRules } from '../../constants/collectionFormValidationRules'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { FormattedMessage, useIntl } from 'react-intl'

export const ModifyCollection: React.FC<IModifyCollection> = ({
  header,
  action,
  title = '',
  description = '',
  topic = '',
  imageUrl = '',
  extraFields = [],
}) => {
  const { state } = useLocation()
  const { ownerId } = state || ''
  const { collectionId } = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const intl = useIntl()

  const { user } = useAppSelector((state) => state.auth)
  const { isLoading, error } = useAppSelector((state) => state.collections)

  const [imgUrl, setImgUrl] = React.useState<string>(imageUrl)
  const [tabValue, setTabValue] = React.useState(0)

  const {
    additionalFields,
    handleChangeAdditionalField,
    handleChangeIsVisible,
    handleDeleteField,
    createAdditionalField,
  } = useAdditionalFields(extraFields)

  const methods = useForm<CollectionForm>({
    defaultValues: {
      title: title,
      description: description,
      topic: topic,
    },
  })

  const {
    handleSubmit,
    formState: { isValid },
  } = methods

  const onSubmit: SubmitHandler<CollectionForm> = (formData) => {
    if (isValid) {
      if (action === 'create' && user && ownerId) {
        const body = {
          ...formData,
          ownerId,
          imageUrl: imgUrl,
          extraFields: additionalFields,
        }

        dispatch(createCollection({ token: user.token, body })).then(() => navigate(-1))
      } else if (action === 'edit' && user && collectionId) {
        const { token } = user
        const newBody = {
          ...formData,
          imageUrl: imgUrl,
          extraFields: additionalFields,
        }

        dispatch(updateCollectionById({ id: collectionId, token, newBody })).then(() =>
          navigate(-1),
        )
      }
    }
  }

  const handleChangeTabValue = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
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
          <Typography variant='h4' component='h4' textAlign={'center'}>
            {header}
          </Typography>
          <FormProvider {...methods}>
            <FormInputText
              name={'title'}
              label={intl.formatMessage({ id: 'app.collection.formFields.title' })}
              rules={validationRules.title}
            />
            <Box sx={{ width: '100%', minHeight: '168px' }}>
              <Box sx={{ borderBottom: 2, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={handleChangeTabValue}>
                  <Tab
                    label={intl.formatMessage({ id: 'app.collection.formFields.description.edit' })}
                  />
                  <Tab
                    label={intl.formatMessage({
                      id: 'app.collection.formFields.description.preview',
                    })}
                  />
                </Tabs>
              </Box>
              <TabPanel value={tabValue} index={0}>
                <FormInputTextarea
                  name={'description'}
                  label={intl.formatMessage({ id: 'app.collection.formFields.description' })}
                  rules={validationRules.description}
                />
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <FormOutputMarkdown name={'description'} />
              </TabPanel>
            </Box>
            <FormInputDropdown
              name={'topic'}
              label={intl.formatMessage({ id: 'app.collection.formFields.topic' })}
              rules={validationRules.topic}
              selectOptions={topics}
            />
          </FormProvider>
          <DropZone imgUrl={imgUrl} setImgUrl={setImgUrl} />
          <Button variant='contained' type='submit' style={{ alignSelf: 'flex-end' }}>
            {action === 'create' ? (
              <FormattedMessage id='app.buttons.createCollection' />
            ) : (
              <FormattedMessage id='app.buttons.updateCollection' />
            )}
          </Button>
          {isLoading && <Spinner />}
          {error && <Alert severity='error'>{error.message}</Alert>}
        </Stack>
        <Typography variant='h6' component='h6' align='center'>
          <FormattedMessage id='app.main.titles.optionalFields' />
        </Typography>
        {action === 'create' && <DialogMenu createAdditionalField={createAdditionalField} />}
        <CollectionAdditionalFields
          action={action}
          additionalFields={additionalFields}
          handleChangeAdditionalField={handleChangeAdditionalField}
          handleChangeIsVisible={handleChangeIsVisible}
          handleDeleteField={handleDeleteField}
        />
      </Box>
    </Container>
  )
}
