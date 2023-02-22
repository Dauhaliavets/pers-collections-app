import { IItem } from '../../store/slices/itemsSlice/model'

interface ICommentListProps {
  currentItem: IItem
}

type TCommentForm = {
  commentBody: string
}

interface IItemDetailsHeaderProps {
  currentItem: IItem
}

interface IItemDetailsTableProps {
  currentItem: IItem
}

export type { ICommentListProps, TCommentForm, IItemDetailsHeaderProps, IItemDetailsTableProps }
