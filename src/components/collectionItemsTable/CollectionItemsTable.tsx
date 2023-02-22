import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store'
import { IItem } from '../../store/slices/itemsSlice/model'
import { ICollection } from '../../store/slices/collectionsSlice/model'
import { getVisibleExtraFieldIds } from '../../utils/getVisibleExtraFieldIds'
import { deleteItemById } from '../../store/slices/itemsSlice/itemsSlice'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableFooter from '@mui/material/TableFooter'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import PreviewIcon from '@mui/icons-material/Preview'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import TableHead from '@mui/material/TableHead'
import { TablePaginationActions } from './TablePaginationActions'

interface ICollectionItemsProps {
  items: IItem[]
  currentCollection: ICollection
  isOwnerOrAdmin: boolean
}

export const CollectionItemsTable: React.FC<ICollectionItemsProps> = ({
  items,
  currentCollection,
  isOwnerOrAdmin,
}) => {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - items.length) : 0

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleClickShowItemDetails = (id: string) => {
    navigate(`items/${id}`)
  }

  const handleClickEditItem = (id: string) => {
    navigate(`items/${id}/edit`)
  }

  const handleClickDeleteItem = (id: string) => {
    if (user) {
      dispatch(deleteItemById({ id, token: user.token }))
    }
  }

  const visibleExtraFieldIds = getVisibleExtraFieldIds(currentCollection)

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label='custom pagination table'>
        <TableHead>
          <TableRow>
            <TableCell align='center' style={{ width: 40 }}>
              №
            </TableCell>
            <TableCell align='right'>Title</TableCell>
            <TableCell align='right'>Tags</TableCell>
            <TableCell align='right'>Likes</TableCell>
            <TableCell align='right'>Comments</TableCell>
            {currentCollection.extraFields?.map((field) => {
              if (field.visible) {
                return (
                  <TableCell key={field.id} align='right'>
                    {field.label}
                  </TableCell>
                )
              }
            })}
            <TableCell align='center' style={{ width: 100 }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : items
          ).map((row, ind) => (
            <TableRow key={ind}>
              <TableCell align='right'>{ind + 1}</TableCell>
              <TableCell align='right'>{row.title}</TableCell>
              <TableCell align='right'>
                {row.tags.map((tag, i) => (
                  <span key={i}>{tag}</span>
                ))}
              </TableCell>
              <TableCell align='right'>{row.likes?.length}</TableCell>
              <TableCell align='right'>{row.comments?.length}</TableCell>
              {row.extraFields?.map((field) => {
                if (visibleExtraFieldIds.includes(field.id)) {
                  return (
                    <TableCell key={field.id} style={{ width: 160 }} align='right'>
                      {field.value === true ? (
                        <TaskAltIcon />
                      ) : field.value === false ? (
                        <RadioButtonUncheckedIcon />
                      ) : (
                        field.value
                      )}
                    </TableCell>
                  )
                }
              })}
              <TableCell align='center'>
                <IconButton
                  aria-label='show'
                  size='small'
                  color='primary'
                  onClick={() => handleClickShowItemDetails(row?._id as string)}
                >
                  <PreviewIcon fontSize='small' />
                </IconButton>
                {isOwnerOrAdmin && (
                  <IconButton
                    aria-label='edit'
                    size='small'
                    onClick={() => handleClickEditItem(row?._id as string)}
                  >
                    <EditIcon fontSize='small' />
                  </IconButton>
                )}
                {isOwnerOrAdmin && (
                  <IconButton
                    aria-label='delete'
                    size='small'
                    color='error'
                    onClick={() => handleClickDeleteItem(row?._id as string)}
                  >
                    <DeleteIcon fontSize='small' />
                  </IconButton>
                )}
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={12} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={12}
              count={items.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}
