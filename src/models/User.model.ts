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

interface IUser {
  id: string
  username: string
  email: string
  blockedStatus: boolean
  role: Role
}

export { Role }
export type { IAuthUser, IUser }
