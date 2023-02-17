import React from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../store'
import { ModifyCollection } from '../components/modifyCollection/ModifyCollection'

export const EditCollection: React.FC = () => {
  const { collectionId } = useParams()
  const { collections } = useAppSelector((state) => state.collections)

  const [currentCollection] = collections.filter((collection) => collection._id === collectionId)

  const { title, description, topic, imageUrl, extraFields } = currentCollection

  return (
    <ModifyCollection
      header={'Edit Collection'}
      action={'edit'}
      title={title}
      description={description}
      topic={topic}
      imageUrl={imageUrl}
      extraFields={extraFields}
    />
  )
}
