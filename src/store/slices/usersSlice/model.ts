interface IUser {
  _id: string
  username: string
  email: string
  blockedStatus: boolean
  role: 'ADMIN' | 'USER'
}

interface UsersState {
  users: IUser[]
  isLoading: boolean
  error: { message: string } | null
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
  newBody: IUser
}

export type {
  IUser,
  UsersState,
  FetchUsersRequest,
  FetchUserByIdRequest,
  DeleteUserByIdRequest,
  UpdateUserByIdRequest,
}
