import React from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'

import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { updateItemById } from '../store/slices/itemsSlice/itemsSlice'
import TextareaAutosize from '@mui/material/TextareaAutosize'

export const CollectionItemDetails = () => {
  const { itemId } = useParams()
  const { items } = useAppSelector((state) => state.items)
  const { user } = useAppSelector((state) => state.auth)
  const [currentItem] = items.filter((item) => item._id === itemId)
  const dispatch = useAppDispatch()

  const { control, handleSubmit } = useForm<{ message: string }>({
    defaultValues: {
      message: '',
    },
  })

  const onSubmit: SubmitHandler<{ message: string }> = (formData) => {
    if (itemId && user) {
      const newComment = {
        itemId,
        sender: user.username,
        text: formData.message,
      }
      const newBody = {
        comments: [...currentItem.comments, newComment],
      }

      dispatch(updateItemById({ id: itemId, token: user.token, newBody: newBody }))
    }
  }

  return (
    <Box sx={{ display: 'flex', flexGrow: 1, flexDirection: 'column', gap: 2 }}>
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

      <Box onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name='message'
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextareaAutosize
              {...field}
              minRows={3}
              placeholder='Your message'
              style={{ width: 700 }}
            />
          )}
        />
      </Box>

      <Paper>
        <Stack>
          {currentItem.comments?.map((comment, ind) => {
            return (
              <Paper key={ind}>
                <Typography variant='subtitle1' gutterBottom>
                  {comment.sender}
                </Typography>
                <Typography variant='body1' gutterBottom>
                  {comment.text}
                </Typography>
                <Typography variant='caption' gutterBottom>
                  {comment.timestamps?.createdAt}
                </Typography>
              </Paper>
            )
          })}
        </Stack>
      </Paper>
    </Box>
  )
}
