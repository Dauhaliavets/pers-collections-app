import { IItem } from '../../store/slices/itemsSlice/model'

interface ICommentListProps {
  currentItem: IItem
}

type TCommentForm = {
  commentBody: string
}

interface ICommentFormProps {
  itemId: string | undefined
}

interface IItemDetailsTableProps {
  currentItem: IItem
}
export type { ICommentListProps, TCommentForm, ICommentFormProps, IItemDetailsTableProps }
