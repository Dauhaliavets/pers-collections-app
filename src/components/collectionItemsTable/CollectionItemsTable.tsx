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
    { field: 'id', headerName: 'ID', width: 250 },
    { field: 'itemNumber', headerName: '#', width: 50 },
    { field: 'title', headerName: 'Title', width: 120 },
    { field: 'tags', headerName: 'Tags', width: 130 },
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
    <div style={{ height: 400, width: '100%' }}>
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
      />
    </div>
  )
}
