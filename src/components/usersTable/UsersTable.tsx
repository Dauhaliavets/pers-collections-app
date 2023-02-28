import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../store'
import { IUsersTableProps } from './usersTable.types'
import { deleteUserById, updateUserById } from '../../store/slices/usersSlice/usersSlice'
import { Role } from '../../models/User.model'
import { DataGrid } from '@mui/x-data-grid/DataGrid'
import { GridActionsCellItem } from '@mui/x-data-grid/components'
import { GridColDef, GridRowId } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete'
import BlockIcon from '@mui/icons-material/Block'
import PreviewIcon from '@mui/icons-material/Preview'
import SecurityIcon from '@mui/icons-material/Security'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'

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

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'userNumber', headerName: '#', width: 50 },
    { field: 'name', headerName: 'Name', minWidth: 150, flex: 1 },
    { field: 'email', headerName: 'Email', minWidth: 150, flex: 1 },
    { field: 'role', headerName: 'Role', minWidth: 100 },
    { field: 'status', headerName: 'Status', type: 'boolean', width: 100 },
    {
      field: '',
      width: 150,
      sortable: false,
      disableColumnMenu: true,
      align: 'center',
      renderCell: (params) => (
        <>
          <GridActionsCellItem
            icon={<PreviewIcon color='info' />}
            label='Show user'
            onClick={handleShowUserDetails(params.id)}
          />
          <GridActionsCellItem
            icon={
              params.row.role === Role.Admin ? <SupervisorAccountIcon /> : <PersonOutlineIcon />
            }
            label='Change role'
            onClick={handleChangeRole(params.id)}
          />
          <GridActionsCellItem
            icon={
              params.row.status ? <BlockIcon color='error' /> : <SecurityIcon color='success' />
            }
            label='Change status'
            onClick={handleChangeStatus(params.id)}
          />
          <GridActionsCellItem
            icon={<DeleteIcon color='error' />}
            label='Delete'
            onClick={handleDelete(params.id)}
          />
        </>
      ),
    },
  ]

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
