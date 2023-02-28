import { IUser } from '../../../models/User.model'

interface UsersState {
  users: IUser[]
  isLoading: boolean
  error: { message: string } | null
}

interface IRejectValue {
  message: string
}

interface FetchUsersRequest {
  token: string
}

interface FetchUserByIdRequest {
  id: string
  token: string
}

interface DeleteUserByIdRequest {
  id: string
  token: string
}

interface UpdateUserByIdRequest {
  id: string
  token: string
  newBody: Partial<IUser>
}

export type {
  UsersState,
  IRejectValue,
  FetchUsersRequest,
  FetchUserByIdRequest,
  DeleteUserByIdRequest,
  UpdateUserByIdRequest,
}
