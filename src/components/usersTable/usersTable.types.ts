import { IAuthUser } from '../../store/slices/authSlice/model'
import { IUser } from '../../store/slices/usersSlice/model'

interface IUsersTableProps {
  currentUser: IAuthUser
  users: IUser[]
}

export type { IUsersTableProps }
