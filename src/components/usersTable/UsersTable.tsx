import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../store'
import { IUsersTableProps } from './usersTable.types'
import { deleteUserById, updateUserById } from '../../store/slices/usersSlice/usersSlice'
import { Role } from '../../models/User.model'
import { DataGrid } from '@mui/x-data-grid/DataGrid'
import { GridRowId } from '@mui/x-data-grid'
import { createColumns } from './CreateColumns'

export const UsersTable: React.FC<IUsersTableProps> = ({ currentUser, users }) => {
  const { token } = currentUser
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleShowUserDetails = (id: GridRowId) => () => {
    navigate(`/collections/owner/${id}`, { relative: 'path' })
  }

  const handleChangeRole = (id: GridRowId) => () => {
    const [userRow] = users.filter((user) => user.id === id)
    const newRole = userRow.role === Role.Admin ? Role.User : Role.Admin
    dispatch(updateUserById({ id: userRow.id, token, newBody: { role: newRole } }))
  }

  const handleDelete = (id: GridRowId) => () => {
    const [userRow] = users.filter((user) => user.id === id)
    dispatch(deleteUserById({ id: userRow.id, token }))
  }

  const handleChangeStatus = (id: GridRowId) => () => {
    const [userRow] = users.filter((user) => user.id === id)
    const newStatus = !userRow.blockedStatus
    dispatch(
      updateUserById({
        id: userRow.id,
        token,
        newBody: { blockedStatus: newStatus },
      }),
    )
  }

  const rows = users.map((user, ind) => {
    return {
      id: user.id,
      userNumber: ind + 1,
      name: user.username,
      email: user.email,
      role: user.role,
      status: user.blockedStatus,
    }
  })

  const columns = createColumns({
    handleShowUserDetails,
    handleChangeRole,
    handleDelete,
    handleChangeStatus,
  })

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        pageSize={5}
        rowsPerPageOptions={[5]}
        columnVisibilityModel={{
          id: false,
        }}
        disableSelectionOnClick
      />
    </div>
  )
}
