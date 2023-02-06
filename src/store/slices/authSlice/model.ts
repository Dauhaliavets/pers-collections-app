interface IAuthUser {
  id: string
  username: string
  role: 'ADMIN' | 'USER'
  token: string
}

interface AuthState {
  isAuth: boolean
  user: IAuthUser | null
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

export type { IAuthUser, AuthState, LoginRequest, SignUpRequest }
