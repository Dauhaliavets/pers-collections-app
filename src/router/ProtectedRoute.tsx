import React, { ReactElement } from 'react'
import { Navigate } from 'react-router-dom'

interface IProtectedRouteProps {
  isAuth: boolean
  redirectPath?: string
  children: ReactElement
}

export const ProtectedRoute: React.FC<IProtectedRouteProps> = ({
  isAuth,
  redirectPath = '/home',
  children,
}): JSX.Element => {
  if (!isAuth) {
    return <Navigate to={redirectPath} relative={'path'} />
  }

  return children
}
