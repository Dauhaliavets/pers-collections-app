import React from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store'
import {
  createCollection,
  updateCollectionById,
} from '../../store/slices/collectionsSlice/collectionsSlice'
import { topics } from '../../constants/topics'
import { useAdditionalFields } from '../../hooks/useAdditionalFileds'
import { CollectionForm, IModifyCollection } from './modifyCollection.types'
import { DialogMenu } from '../../components/createCollection/DialogMenu'
import { DropZone } from '../../components/createCollection/DropZone'
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

export const ModifyCollection: React.FC<IModifyCollection> = ({
  header,
  action,
  title = '',
  description = '',
  topic = '',
  imageUrl = '',
  extraFields = [],
}) => {
  const { collectionId } = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

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
      if (action === 'create' && user) {
        const { id, token } = user
        const body = {
          ...formData,
          ownerId: id,
          imageUrl: imgUrl,
          extraFields: additionalFields,
        }

        dispatch(createCollection({ token, body })).then(() => navigate(-1))
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
    <Container maxWidth='xl'>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <PrevPageButton />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Stack
          mb={2}
          spacing={2}
          component={'form'}
          onSubmit={handleSubmit(onSubmit)}
          sx={{ width: '800px', position: 'relative' }}
        >
          <Typography variant='h4' component='h4' textAlign={'center'}>
            {header}
          </Typography>
          <FormProvider {...methods}>
            <FormInputText name={'title'} label={'Title'} rules={validationRules.title} />
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 2, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={handleChangeTabValue}>
                  <Tab label='Edit' />
                  <Tab label='Preview' />
                </Tabs>
              </Box>
              <TabPanel value={tabValue} index={0}>
                <FormInputTextarea
                  name={'description'}
                  label={'Description'}
                  rules={validationRules.description}
                />
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <FormOutputMarkdown name={'description'} />
              </TabPanel>
            </Box>
            <FormInputDropdown
              name={'topic'}
              label={'Topic'}
              rules={validationRules.topic}
              selectOptions={topics}
            />
          </FormProvider>
          <DropZone imgUrl={imgUrl} setImgUrl={setImgUrl} />
          <Button variant='contained' type='submit' style={{ alignSelf: 'flex-end' }}>
            {action === 'create' ? 'Create Collection' : 'Update Collection'}
          </Button>
          {isLoading && <Spinner />}
          {error && <Alert severity='error'>{error.message}</Alert>}
        </Stack>

        <Typography variant='h6' component='h6' align='center'>
          Optional field settings
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
