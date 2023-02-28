import React from 'react'
import { useAppDispatch, useAppSelector } from '../store'
import { fetchUsers } from '../store/slices/usersSlice/usersSlice'
import { Spinner } from '../components/shared/spinner/Spinner'
import { UsersTable } from '../components/usersTable/UsersTable'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'

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
    <Container component={'div'} sx={{ position: 'relative' }}>
      <Typography variant='h5' component='h4'>
        Admin Panel
      </Typography>
      {isLoading && <Spinner />}
      {error && <Alert severity='error'>{error.message}</Alert>}
      {user && !!users.length && <UsersTable currentUser={user} users={users} />}
    </Container>
  )
}
