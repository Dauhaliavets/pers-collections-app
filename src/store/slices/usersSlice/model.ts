interface IUser {
  id: string
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
  IUser,
  UsersState,
  IRejectValue,
  FetchUsersRequest,
  FetchUserByIdRequest,
  DeleteUserByIdRequest,
  UpdateUserByIdRequest,
}
