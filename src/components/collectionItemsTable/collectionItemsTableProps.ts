import { ICollection } from '../../store/slices/collectionsSlice/model'
import { IItem } from '../../store/slices/itemsSlice/model'

interface ICollectionItemsProps {
  items: IItem[]
  currentCollection: ICollection
  isOwnerOrAdmin: boolean
}

export type { ICollectionItemsProps }
