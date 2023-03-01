import React from 'react'
import { GridCellParams, GridColDef } from '@mui/x-data-grid'
import { ICreateColumnsProps } from './usersTable.types'
import { useIntl } from 'react-intl'
import { UsersTableActionButtons } from './UsersTableActionButtons'

const createColumns = ({
  handleShowUserDetails,
  handleChangeRole,
  handleDelete,
  handleChangeStatus,
}: ICreateColumnsProps): GridColDef[] => {
  const intl = useIntl()

  return [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'userNumber', headerName: '#', width: 50 },
    {
      field: 'name',
      headerName: intl.formatMessage({ id: 'app.adminPage.table.headerName.name' }),
      minWidth: 150,
      flex: 1,
    },
    {
      field: 'email',
      headerName: intl.formatMessage({ id: 'app.adminPage.table.headerName.email' }),
      minWidth: 150,
      flex: 1,
    },
    {
      field: 'role',
      headerName: intl.formatMessage({ id: 'app.adminPage.table.headerName.role' }),
      width: 80,
    },
    {
      field: 'status',
      headerName: intl.formatMessage({ id: 'app.adminPage.table.headerName.status' }),
      type: 'boolean',
      width: 120,
    },
    {
      field: '',
      headerName: intl.formatMessage({ id: 'app.adminPage.table.headerName.actions' }),
      headerAlign: 'center',
      width: 220,
      sortable: false,
      disableColumnMenu: true,
      align: 'center',
      renderCell: (params: GridCellParams) => (
        <UsersTableActionButtons
          handleShowUserDetails={handleShowUserDetails}
          handleChangeRole={handleChangeRole}
          handleDelete={handleDelete}
          handleChangeStatus={handleChangeStatus}
          params={params}
        />
      ),
    },
  ]
}

export { createColumns }
