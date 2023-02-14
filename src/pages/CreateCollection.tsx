import React from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import {
  Box,
  Button,
  Checkbox,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Tab,
  Tabs,
  TextareaAutosize,
  TextField,
  Typography,
} from '@mui/material'
import { TabPanel } from '../components/material/tabPanel/tabPanel'
import { ElementSwitcher } from '../components/shared/elementSwitcher/ElementSwitcher'
import DeleteIcon from '@mui/icons-material/Delete'
import ReactMarkdown from 'react-markdown'
import { DialogMenu } from '../components/createCollection/DialogMenu'
import { useAdditionalFields } from '../hooks/useAdditionalFileds'
import { topics } from '../constants/topics'
import { DropZone } from '../components/createCollection/DropZone'
import { useAppDispatch, useAppSelector } from '../store'
import { createCollection } from '../store/slices/collectionsSlice/collectionsSlice'
import { useNavigate } from 'react-router-dom'

type CollectionForm = {
  title: string
  description: string
  topic: string
}

export const CreateCollection: React.FC = () => {
  const [imgUrl, setImgUrl] = React.useState<string>('')
  const [tabValue, setTabValue] = React.useState(0)
  const {
    additionalFields,
    handleChangeAdditionalField,
    handleChangeIsVisible,
    handleDeleteField,
    createAdditionalField,
  } = useAdditionalFields([])
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<CollectionForm>({
    defaultValues: {
      title: '',
      description: '',
      topic: '',
    },
  })
  const { user } = useAppSelector((state) => state.auth)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<CollectionForm> = (formData) => {
    const newCollection = {
      ...formData,
      ownerId: user?.id as string,
      imageUrl: imgUrl,
      extraFields: additionalFields,
    }

    dispatch(createCollection({ token: user?.token as string, body: newCollection }))
    navigate(-1)
  }

  const handleChangeTabValue = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Typography variant='h5' component='h5' align='center'>
        Create New Collection
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
              Create Collection
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
                <ElementSwitcher field={field} handleChange={handleChangeAdditionalField} />
                <Box>
                  <Checkbox
                    id='isVisibleField'
                    checked={field.visible}
                    onChange={(e) => handleChangeIsVisible(e, field.id)}
                  />
                  <label htmlFor='isVisibleField'>{field.visible ? 'Visible' : 'Invisible'}</label>
                  <IconButton onClick={() => handleDeleteField(field.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </div>
  )
}
