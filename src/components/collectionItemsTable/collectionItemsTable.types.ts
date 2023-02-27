import { IItem } from '../../models/Item.model'
import { ICollection } from '../../store/slices/collectionsSlice/model'

interface ICollectionItemsProps {
  items: IItem[]
  currentCollection: ICollection
  isOwnerOrAdmin: boolean
}

export type { ICollectionItemsProps }
