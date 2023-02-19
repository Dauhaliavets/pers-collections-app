import React from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../store'
import { ModifyCollectionItem } from '../components/modifyCollectionItem/ModifyCollectionItem'

export const CreateCollectionItem: React.FC = () => {
  const { collectionId } = useParams()

  const [currentCollection] = useAppSelector((state) =>
    state.collections.collections.filter((collection) => collection._id === collectionId),
  )
  const { extraFields } = currentCollection

  return <ModifyCollectionItem header={'Create Item'} action={'create'} extraFields={extraFields} />
}
