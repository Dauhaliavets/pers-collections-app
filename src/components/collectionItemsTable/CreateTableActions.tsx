import React from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { useAppDispatch, useAppSelector } from '../../store'
import { deleteItemById } from '../../store/slices/itemsSlice/itemsSlice'
import PreviewIcon from '@mui/icons-material/Preview'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { GridActionsCellItem, GridRowId, GridRowParams } from '@mui/x-data-grid'

export const TableActions = (params: GridRowParams, isVisible: boolean) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)

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

  const actions = [
    <GridActionsCellItem
      icon={<PreviewIcon fontSize='small' />}
      label='Show'
      onClick={() => handleClickShowItemDetails(params.id)}
      key={uuidv4()}
    />,
    isVisible && (
      <GridActionsCellItem
        icon={<EditIcon fontSize='small' />}
        label='Edit'
        onClick={() => handleClickEditItem(params.id)}
        showInMenu
      />
    ),
    isVisible && (
      <GridActionsCellItem
        icon={<DeleteIcon fontSize='small' />}
        label='Delete'
        onClick={() => handleClickDeleteItem(params.id)}
        showInMenu
      />
    ),
  ]

  return actions.filter((action) => action)
}
