import { IAuthUser } from '../../../models/User.model'

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

type AuthWithGoogleRequest = {
  credential: string
}

export type { AuthState, IRejectValue, LoginRequest, SignUpRequest, AuthWithGoogleRequest }
