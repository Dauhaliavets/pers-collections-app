import { IAuthUser, IUser } from '../../models/User.model'

interface IUsersTableProps {
  currentUser: IAuthUser
  users: IUser[]
}

export type { IUsersTableProps }
