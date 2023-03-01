import { GridCellParams, GridRowId } from '@mui/x-data-grid'
import { IAuthUser, IUser } from '../../models/User.model'

interface IUsersTableProps {
  currentUser: IAuthUser
  users: IUser[]
}

interface ICreateColumnsProps {
  handleShowUserDetails: (id: GridRowId) => () => void
  handleChangeRole: (id: GridRowId) => () => void
  handleDelete: (id: GridRowId) => () => void
  handleChangeStatus: (id: GridRowId) => () => void
}
interface IUsersTableActionButtonsProps {
  handleShowUserDetails: (id: GridRowId) => () => void
  handleChangeRole: (id: GridRowId) => () => void
  handleDelete: (id: GridRowId) => () => void
  handleChangeStatus: (id: GridRowId) => () => void
  params: GridCellParams
}

export type { IUsersTableProps, ICreateColumnsProps, IUsersTableActionButtonsProps }
