import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store'
import {
  createCollection,
  updateCollectionById,
} from '../../store/slices/collectionsSlice/collectionsSlice'
import { topics } from '../../constants/topics'
import { useAdditionalFields } from '../../hooks/useAdditionalFileds'
import { ElementSwitcher } from '../../components/shared/elementSwitcher/ElementSwitcher'
import { DialogMenu } from '../../components/createCollection/DialogMenu'
import { DropZone } from '../../components/createCollection/DropZone'

import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import DeleteIcon from '@mui/icons-material/Delete'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import { IAdditionalField } from '../../models/additionalField.model'
import { TabPanel } from './tabPanel/TabPanel'

type CollectionForm = {
  title: string
  description: string
  topic: string
}

interface IModifyCollection {
  action: 'create' | 'edit'
  header: string
  title?: string
  description?: string
  topic?: string
  imageUrl?: string
  extraFields?: IAdditionalField[]
}

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

  const [imgUrl, setImgUrl] = React.useState<string>(imageUrl)
  const [tabValue, setTabValue] = React.useState(0)

  const {
    additionalFields,
    handleChangeAdditionalField,
    handleChangeIsVisible,
    handleDeleteField,
    createAdditionalField,
  } = useAdditionalFields(extraFields)

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<CollectionForm>({
    defaultValues: {
      title: title,
      description: description,
      topic: topic,
    },
  })

  const onSubmit: SubmitHandler<CollectionForm> = (formData) => {
    if (action === 'create') {
      if (user) {
        const { id, token } = user
        const body = {
          ...formData,
          ownerId: id,
          imageUrl: imgUrl,
          extraFields: additionalFields,
        }

        dispatch(createCollection({ token, body })).then(() => navigate(-1))
      }
    } else if (action === 'edit') {
      if (user && collectionId) {
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
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Typography variant='h5' component='h5' align='center'>
        {header}
      </Typography>
      <Grid container spacing={1}>
        <Grid container item spacing={2} component={'form'} onSubmit={handleSubmit(onSubmit)}>
          <Grid item xs={2}>
            <Typography variant='h6' component='h6'>
              Title:
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Controller
              name='title'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder='Enter title'
                  variant='outlined'
                  autoComplete='off'
                  size='small'
                />
              )}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant='h6' component='h6'>
              Description:
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 2, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={handleChangeTabValue}>
                  <Tab label='Edit' />
                  <Tab label='Preview' />
                </Tabs>
              </Box>
              <TabPanel value={tabValue} index={0}>
                <Controller
                  name='description'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextareaAutosize
                      {...field}
                      minRows={3}
                      placeholder='Here you can write Markdown'
                      style={{ width: 700 }}
                    />
                  )}
                />
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <Controller
                  name='description'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <ReactMarkdown>{field.value}</ReactMarkdown>}
                />
              </TabPanel>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Typography variant='h6' component='h6'>
              Topic:
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Controller
              name='topic'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select {...field} size='small' sx={{ width: '200px' }} displayEmpty>
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  {topics.map((topic, ind) => (
                    <MenuItem key={ind} value={topic.value}>
                      {topic.label}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant='h6' component='h6'>
              Image:
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <DropZone imgUrl={imgUrl} setImgUrl={setImgUrl} />
          </Grid>
          <Grid item xs={10}>
            <Button variant='contained' type='submit' disabled={!isValid}>
              {action === 'create' ? 'Create Collection' : 'Update Collection'}
            </Button>
          </Grid>
        </Grid>
        <Grid container item spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h6' component='h6' align='center'>
              Here you can add any fields for each element of the collection
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Typography variant='h6' component='h6' align='left'>
              Setting custom collection fields
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <DialogMenu createAdditionalField={createAdditionalField} />
          </Grid>
          <Stack spacing={1} width={'100%'}>
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
                <Box
                  sx={{
                    width: '100%',
                    backgroundColor: '#cccccc33',
                    position: 'relative',
                    zIndex: -1,
                  }}
                >
                  <ElementSwitcher field={field} handleChange={handleChangeAdditionalField} />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    wrap: 'nowrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      wrap: 'nowrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Checkbox
                      id='isVisibleField'
                      checked={field.visible}
                      onChange={(e) => handleChangeIsVisible(e, field.id)}
                    />
                    <label htmlFor='isVisibleField'>
                      {field.visible ? 'Visible' : 'Invisible'}
                    </label>
                  </Box>
                  {action === 'create' && (
                    <IconButton onClick={() => handleDeleteField(field.id)}>
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Box>
              </Box>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </div>
  )
}
