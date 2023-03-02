import React from 'react'
import { useAppDispatch, useAppSelector } from '../store'
import { fetchUsers } from '../store/slices/usersSlice/usersSlice'
import { Spinner } from '../components/shared/spinner/Spinner'
import { UsersTable } from '../components/usersTable/UsersTable'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import { FormattedMessage } from 'react-intl'

export const AdminPage: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth)
  const { users, isLoading, error } = useAppSelector((state) => state.users)
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    if (user) {
      dispatch(fetchUsers({ token: user.token }))
    }
  }, [])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, gap: '20px' }}>
      <Typography variant='h5' component='h4'>
        <FormattedMessage id='app.adminPage.title' />
      </Typography>
      {isLoading && <Spinner />}
      {error && <Alert severity='error'>{error.message}</Alert>}
      {user && !!users.length && <UsersTable currentUser={user} users={users} />}
    </Box>
  )
}
