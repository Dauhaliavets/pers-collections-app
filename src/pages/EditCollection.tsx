import React from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../store'
import { ModifyCollection } from '../components/modifyCollection/ModifyCollection'
import { useIntl } from 'react-intl'

export const EditCollection: React.FC = () => {
  const { collectionId } = useParams()
  const { collections } = useAppSelector((state) => state.collections)
  const intl = useIntl()

  const [currentCollection] = collections.filter((collection) => collection._id === collectionId)

  const { title, description, topic, imageUrl, extraFields } = currentCollection

  return (
    <ModifyCollection
      header={intl.formatMessage({ id: 'app.main.titles.collection.edit' })}
      action={'edit'}
      title={title}
      description={description}
      topic={topic}
      imageUrl={imageUrl}
      extraFields={extraFields}
    />
  )
}
