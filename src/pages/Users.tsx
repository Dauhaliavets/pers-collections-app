import React from 'react'
import { useAppDispatch, useAppSelector } from '../store'
import { fetchUsers, updateUserById, deleteUserById } from '../store/slices/usersSlice/usersSlice'
import { Role } from '../store/slices/authSlice/model'

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
  Select,
  MenuItem,
  SelectChangeEvent,
  Stack,
  Typography,
  Button,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { AntSwitch } from '../components/material/switch/switch'

export const Users: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth)
  const { users, isLoading, error } = useAppSelector((state) => state.users)
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    dispatch(fetchUsers({ token: `${user?.token}` }))
  }, [])

  const handleChangeRole = (event: SelectChangeEvent, id: string) => {
    const newRole = event.target.value as Role
    dispatch(updateUserById({ id, token: `${user?.token}`, newBody: { role: newRole } }))
  }

  const handleDelete = (id: string) => {
    dispatch(deleteUserById({ id, token: `${user?.token}` }))
  }

  const handleChangeStatus = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const newStatus = event.target.checked
    dispatch(updateUserById({ id, token: `${user?.token}`, newBody: { blockedStatus: newStatus } }))
  }

  return (
    <Container component={'div'} sx={{ display: 'flex', flexDirection: 'column' }}>
      <h3>Your admin panel</h3>
      <h4>Users</h4>
      {isLoading && (
        <Box sx={{ width: 650 }}>
          <Skeleton animation='wave' />
          <Skeleton animation='wave' />
          <Skeleton animation='wave' />
          <Skeleton animation='wave' />
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
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((row, ind) => (
                <TableRow key={row.id} hover={true}>
                  <TableCell component='th' scope='row' width={'10%'}>
                    {ind + 1}
                  </TableCell>
                  <TableCell width={'20%'} align='left'>
                    {row.username}
                  </TableCell>
                  <TableCell width={'20%'} align='left'>
                    {row.email}
                  </TableCell>
                  <TableCell width={'20%'} align='left'>
                    <Select
                      value={row.role}
                      onChange={(e) => handleChangeRole(e, row.id)}
                      sx={{ minWidth: 100 }}
                      size='small'
                    >
                      <MenuItem value={Role.Admin}>admin</MenuItem>
                      <MenuItem value={Role.User}>user</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell width={'20%'} align='left'>
                    <Stack direction='row' spacing={1} alignItems='center'>
                      <AntSwitch
                        checked={row.blockedStatus}
                        onChange={(e) => handleChangeStatus(e, row.id)}
                        inputProps={{ 'aria-label': 'ant design' }}
                      />
                      <Typography>{row.blockedStatus ? 'Blocked' : 'Unblocked'}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell width={'10%'} align='center'>
                    <Button onClick={() => handleDelete(row.id)}>
                      <DeleteIcon />
                    </Button>
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
