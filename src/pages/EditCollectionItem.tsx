import React from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../store'
import { ModifyCollectionItem } from '../components/modifyCollectionItem/ModifyCollectionItem'
import { useIntl } from 'react-intl'

export const EditCollectionItem: React.FC = () => {
  const { itemId } = useParams()
  const intl = useIntl()

  const [editableItem] = useAppSelector((state) =>
    state.items.items.filter((item) => item._id === itemId),
  )
  const { title, tags, extraFields } = editableItem

  return (
    <ModifyCollectionItem
      header={intl.formatMessage({ id: 'app.main.titles.item.edit' })}
      action={'edit'}
      title={title}
      tags={tags}
      extraFields={extraFields}
    />
  )
}
