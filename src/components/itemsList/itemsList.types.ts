import { IItem } from '../../models/Item.model'

interface IItemsListProps {
  data: IItem[]
  title?: string
  children?: React.ReactNode
}

export type { IItemsListProps }
