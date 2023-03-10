import React from 'react'
import { DataGrid, GridRowParams } from '@mui/x-data-grid'
import { getExtraFieldsForColumns } from '../../utils/getExtraFieldsForColumns'
import { getExtraFieldsForItem } from '../../utils/getExtraFieldsForItem'
import { ICollectionItemsProps } from './collectionItemsTable.types'
import { CustomToolbar } from '../shared/tableTools/CustomToolbar'
import { CellValueFalseIcon } from '../shared/tableTools/CellValueFalseIcon'
import { CellValueTrueIcon } from '../shared/tableTools/CellValueTrueIcon'
import { TableActions } from './CreateTableActions'

export const CollectionItemsTable: React.FC<ICollectionItemsProps> = ({
  items,
  currentCollection,
  isOwnerOrAdmin,
}) => {
  const rows = items.map((item, ind) => {
    const extraFields = getExtraFieldsForItem(item)

    return {
      id: item._id,
      itemNumber: ind + 1,
      title: item.title,
      tags: item.tags,
      likes: item.likes.length,
      comments: item.comments.length,
      ...extraFields,
    }
  })

  const extraFieldsForColumns = getExtraFieldsForColumns(currentCollection)

  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'itemNumber', headerName: '#', width: 50 },
    { field: 'title', headerName: 'Title', minWidth: 180, flex: 1 },
    { field: 'tags', headerName: 'Tags', minWidth: 180, flex: 1 },
    { field: 'likes', headerName: 'Likes', type: 'number', width: 60 },
    {
      field: 'comments',
      headerName: 'Comments',
      type: 'number',
      width: 90,
    },
    ...extraFieldsForColumns,
    {
      field: 'actions',
      type: 'actions',
      width: 80,
      getActions: (params: GridRowParams) => TableActions(params, isOwnerOrAdmin),
    },
  ]

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5]}
      components={{
        Toolbar: CustomToolbar,
        BooleanCellFalseIcon: CellValueFalseIcon,
        BooleanCellTrueIcon: CellValueTrueIcon,
      }}
      columnVisibilityModel={{
        id: false,
      }}
      autoHeight
      sx={{
        '& ::-webkit-scrollbar': { height: 8 },
        '& ::-webkit-scrollbar-track': { background: 'inherit' },
        '& ::-webkit-scrollbar-thumb': { background: '#b3b3b3', borderRadius: 4 },
      }}
    />
  )
}
