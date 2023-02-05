interface IUser {
  username: string
  role: 'ADMIN' | 'USER'
  token: string
}

interface AuthState {
  isAuth: boolean
  user: IUser | null
  isLoading: boolean
  error: { message: string } | null
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

export type { IUser, AuthState, LoginRequest, SignUpRequest }
