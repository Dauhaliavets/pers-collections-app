enum Role {
  Admin = 'ADMIN',
  User = 'USER',
}

interface IAuthUser {
  id: string
  username: string
  role: Role
  token: string
}

interface AuthState {
  isAuth: boolean
  user: IAuthUser | null
  isLoading: boolean
  error: { message: string } | null
}

interface IRejectValue {
  message: string
}

type LoginRequest = {
  username: string
  password: string
}

type SignUpRequest = {
  username: string
  email: string
  password: string
}

export { Role }
export type { IAuthUser, AuthState, IRejectValue, LoginRequest, SignUpRequest }
