import { ICollection } from '../../store/slices/collectionsSlice/collectionsSlice.types'

interface ICollectionsWrapperProps {
  title: string
  collections: ICollection[]
  children?: React.ReactNode
}

export type { ICollectionsWrapperProps }
