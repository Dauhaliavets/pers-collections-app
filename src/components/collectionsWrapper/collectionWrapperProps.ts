import { ICollection } from '../../store/slices/collectionsSlice/model'

interface ICollectionsWrapperProps {
  title: string
  collections: ICollection[]
  children?: React.ReactNode
}

export type { ICollectionsWrapperProps }
