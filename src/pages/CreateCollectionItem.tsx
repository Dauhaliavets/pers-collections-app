import React from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../store'
import { ModifyCollectionItem } from '../components/modifyCollectionItem/ModifyCollectionItem'
import { useIntl } from 'react-intl'

export const CreateCollectionItem: React.FC = () => {
  const { collectionId } = useParams()
  const intl = useIntl()

  const [currentCollection] = useAppSelector((state) =>
    state.collections.collections.filter((collection) => collection._id === collectionId),
  )
  const { extraFields } = currentCollection

  return (
    <ModifyCollectionItem
      header={intl.formatMessage({ id: 'app.main.titles.item.create' })}
      action={'create'}
      extraFields={extraFields}
    />
  )
}
