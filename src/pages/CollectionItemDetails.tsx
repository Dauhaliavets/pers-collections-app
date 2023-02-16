import React from 'react'
import { useParams } from 'react-router-dom'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../store'
import { createItemComment, updateItemFromSocket } from '../store/slices/itemsSlice/itemsSlice'
import { transformDate } from '../utils/transformDate'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Paper from '@mui/material/Paper'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

import io from 'socket.io-client'
import { API_URL } from '../constants/api'

const socket = io(API_URL)

type CommentForm = {
  message: string
}

export const CollectionItemDetails = () => {
  const { itemId } = useParams()
  const { items } = useAppSelector((state) => state.items)
  const { user } = useAppSelector((state) => state.auth)
  const [currentItem] = items.filter((item) => item._id === itemId)
  const dispatch = useAppDispatch()

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<CommentForm>({
    defaultValues: {
      message: '',
    },
  })

  const onSubmit: SubmitHandler<CommentForm> = (formData) => {
    if (itemId && user) {
      const commentBody = {
        sender: user.username,
        text: formData.message,
      }

      dispatch(createItemComment({ id: itemId, token: user.token, commentBody }))
    }
  }

  React.useEffect(() => {
    socket.on('new-comment', (data) => dispatch(updateItemFromSocket(data)))

    return () => {
      socket.off('new-comment')
    }
  }, [])

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography align='center'>Collection Item Details</Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow hover>
              <TableCell variant='head' style={{ minWidth: 80, maxWidth: 150 }}>
                Title:{' '}
              </TableCell>
              <TableCell>{currentItem.title}</TableCell>
            </TableRow>
            <TableRow hover>
              <TableCell variant='head' style={{ minWidth: 80, maxWidth: 150 }}>
                Tags:{' '}
              </TableCell>
              <TableCell>{currentItem.tags}</TableCell>
            </TableRow>

            {currentItem.extraFields?.map((field, ind) => (
              <TableRow key={ind} hover>
                <TableCell variant='head' style={{ minWidth: 80, maxWidth: 150 }}>
                  {field.label}
                </TableCell>
                <TableCell>
                  {field.value === true ? (
                    <TaskAltIcon />
                  ) : field.value === false ? (
                    <RadioButtonUncheckedIcon />
                  ) : (
                    field.value
                  )}
                </TableCell>
              </TableRow>
            ))}
            {/* {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={12} />
            </TableRow>
          )} */}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        component={'form'}
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: 'flex', flexDirection: 'column', maxWidth: '600px', gap: 1 }}
      >
        <Controller
          name='message'
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextareaAutosize
              {...field}
              minRows={3}
              placeholder='Your message'
              style={{ maxWidth: 700 }}
            />
          )}
        />
        <Button
          variant='contained'
          type='submit'
          disabled={!isValid}
          sx={{ alignSelf: 'flex-end' }}
        >
          Send
        </Button>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexGrow: 1,
          flexDirection: 'column',
          width: '100%',
          gap: 1,
        }}
      >
        {currentItem.comments?.map((comment, ind) => {
          return (
            <Card key={ind} sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
                  {comment.sender}
                </Typography>
                <Typography variant='h5' component='div'>
                  {comment.text}
                </Typography>
                <Typography align='right' color='text.secondary'>
                  {transformDate(comment.createdAt)}
                </Typography>
              </CardContent>
            </Card>
          )
        })}
      </Box>
    </Box>
  )
}
