import React from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../store'
import { ModifyCollectionItem } from '../components/modifyCollectionItem/ModifyCollectionItem'

export const EditCollectionItem: React.FC = () => {
  const { itemId } = useParams()

  const [editableItem] = useAppSelector((state) =>
    state.items.items.filter((item) => item._id === itemId),
  )
  const { title, tags, extraFields } = editableItem

  return (
    <ModifyCollectionItem
      header={'Update Item'}
      action={'edit'}
      title={title}
      tags={tags}
      extraFields={extraFields}
    />
  )
}
