import React from 'react'
import { Role } from '../../models/User.model'
import DeleteIcon from '@mui/icons-material/Delete'
import BlockIcon from '@mui/icons-material/Block'
import PreviewIcon from '@mui/icons-material/Preview'
import SecurityIcon from '@mui/icons-material/Security'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import { useIntl } from 'react-intl'
import { IUsersTableActionButtonsProps } from './usersTable.types'

export const UsersTableActionButtons: React.FC<IUsersTableActionButtonsProps> = ({
  handleShowUserDetails,
  handleChangeRole,
  handleDelete,
  handleChangeStatus,
  params,
}) => {
  const intl = useIntl()
  return (
    <>
      <Tooltip title={intl.formatMessage({ id: 'app.adminPage.table.actions.button.showUser' })}>
        <IconButton size='small' onClick={handleShowUserDetails(params.id)}>
          <PreviewIcon color='info' />
        </IconButton>
      </Tooltip>
      <Tooltip
        title={intl.formatMessage({
          id: 'app.adminPage.table.actions.button.changeRole',
        })}
      >
        <IconButton size='small' onClick={handleChangeRole(params.id)}>
          {params.row.role === Role.Admin ? <SupervisorAccountIcon /> : <PersonOutlineIcon />}
        </IconButton>
      </Tooltip>
      <Tooltip
        title={intl.formatMessage({
          id: 'app.adminPage.table.actions.button.changeStatus',
        })}
      >
        <IconButton size='small' onClick={handleChangeStatus(params.id)}>
          {params.row.status ? <SecurityIcon color='success' /> : <BlockIcon color='error' />}
        </IconButton>
      </Tooltip>
      <Tooltip
        title={intl.formatMessage({
          id: 'app.adminPage.table.actions.button.deleteUser',
        })}
      >
        <IconButton size='small' onClick={handleDelete(params.id)}>
          <DeleteIcon color='error' />
        </IconButton>
      </Tooltip>
    </>
  )
}
