import React from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { useAppDispatch, useAppSelector } from '../../store'
import { deleteItemById } from '../../store/slices/itemsSlice/itemsSlice'
import { DataGrid, GridColumns, GridActionsCellItem, GridRowId } from '@mui/x-data-grid'
import { getExtraFieldsForColumns } from '../../utils/getExtraFieldsForColumns'
import { getExtraFieldsForItem } from '../../utils/getExtraFieldsForItem'
import { ICollectionItemsProps } from './collectionItemsTableProps'
import { CustomToolbar } from '../shared/tableTools/CustomToolbar'
import { CellValueFalseIcon } from '../shared/tableTools/CellValueFalseIcon'
import { CellValueTrueIcon } from '../shared/tableTools/CellValueTrueIcon'
import PreviewIcon from '@mui/icons-material/Preview'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

export const CollectionItemsTable: React.FC<ICollectionItemsProps> = ({
  items,
  currentCollection,
  isOwnerOrAdmin,
}) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)

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

  type Row = (typeof rows)[number]

  const extraFieldsForColumns = getExtraFieldsForColumns(currentCollection)

  const columns = React.useMemo<GridColumns<Row>>(
    () => [
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
        getActions: (params) =>
          [
            <GridActionsCellItem
              icon={<PreviewIcon fontSize='small' />}
              label='Show'
              onClick={() => handleClickShowItemDetails(params.id)}
              key={uuidv4()}
            />,
            isOwnerOrAdmin && (
              <GridActionsCellItem
                icon={<EditIcon fontSize='small' />}
                label='Edit'
                onClick={() => handleClickEditItem(params.id)}
                showInMenu
              />
            ),
            isOwnerOrAdmin && (
              <GridActionsCellItem
                icon={<DeleteIcon fontSize='small' />}
                label='Delete'
                onClick={() => handleClickDeleteItem(params.id)}
                showInMenu
              />
            ),
          ].filter((action) => action),
      },
    ],
    [handleClickShowItemDetails, handleClickEditItem, handleClickDeleteItem],
  )

  function handleClickShowItemDetails(id: GridRowId) {
    navigate(`items/${id}`)
  }

  function handleClickEditItem(id: GridRowId) {
    navigate(`items/${id}/edit`)
  }

  function handleClickDeleteItem(id: GridRowId) {
    if (user) {
      dispatch(deleteItemById({ id: `${id}`, token: user.token }))
    }
  }

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
