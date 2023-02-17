import React from 'react'
import { ModifyCollection } from '../components/modifyCollection/ModifyCollection'

export const CreateCollection: React.FC = () => {
  return <ModifyCollection header={'Create New Collection'} action={'create'} />
}
