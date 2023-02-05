import React from 'react'
import { useAppDispatch, useAppSelector } from '../store'
import { fetchUsers } from '../store/slices/usersSlice/usersSlice'
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  Box,
  Skeleton,
  Container,
} from '@mui/material'

export const AdminPage: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth)
  const { users, isLoading, error } = useAppSelector((state) => state.users)
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    dispatch(fetchUsers({ token: `${user?.token}` }))
  }, [])

  return (
    <Container component={'div'} sx={{ display: 'flex', flexDirection: 'column' }}>
      <h3>Your admin panel</h3>
      <h4>Users</h4>
      {isLoading && (
        <Box sx={{ width: 650 }}>
          <Skeleton animation='wave' />
        </Box>
      )}
      {!isLoading && !error && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>№</TableCell>
                <TableCell align='left'>Name</TableCell>
                <TableCell align='left'>Email</TableCell>
                <TableCell align='left'>Role</TableCell>
                <TableCell align='left'>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((row, ind) => (
                <TableRow key={row._id} hover={true}>
                  <TableCell component='th' scope='row' width={'10%'}>
                    {ind + 1}
                  </TableCell>
                  <TableCell width={'30%'} align='left'>
                    {row.username}
                  </TableCell>
                  <TableCell width={'30%'} align='left'>
                    {row.email}
                  </TableCell>
                  <TableCell width={'20%'} align='left'>
                    {row.role}
                  </TableCell>
                  <TableCell width={'10%'} align='left'>
                    {row.blockedStatus ? 'Blocked' : 'Unblocked'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  )
}
