import { IItem } from '../../models/Item.model'

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
