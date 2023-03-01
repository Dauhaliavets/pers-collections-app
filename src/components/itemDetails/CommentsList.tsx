import React from 'react'
import { ICommentListProps } from './itemDetails.types'
import { transformDate } from '../../utils/transformDate'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { FormattedMessage } from 'react-intl'

export const CommentsList: React.FC<ICommentListProps> = ({ currentItem }) => {
  const { comments } = currentItem
  return (
    <Box
      sx={{
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        width: '100%',
        gap: 1,
      }}
    >
      {comments && comments.length ? (
        <Box>
          <Typography align='center'>
            <FormattedMessage id='app.collectionItemDetails.comments.title' />
          </Typography>
          {comments.map((comment, ind) => {
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
                    {transformDate(comment.createdDate)}
                  </Typography>
                </CardContent>
              </Card>
            )
          })}
        </Box>
      ) : (
        <Typography align='center'>
          <FormattedMessage id='app.collectionItemDetails.comments.subtitle' />
        </Typography>
      )}
    </Box>
  )
}
