import * as React from 'react'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableFooter from '@mui/material/TableFooter'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import LastPageIcon from '@mui/icons-material/LastPage'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store'
import { Alert, Button, TableHead } from '@mui/material'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import PreviewIcon from '@mui/icons-material/Preview'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { PrevPageButton } from '../components/shared/buttons/PrevPageButton'
import { fetchItemsByCollectionId } from '../store/slices/itemsSlice/itemsSlice'
import { Spinner } from '../components/shared/spinner/Spinner'

interface TablePaginationActionsProps {
  count: number
  page: number
  rowsPerPage: number
  onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme()
  const { count, page, rowsPerPage, onPageChange } = props

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, 0)
  }

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1)
  }

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1)
  }

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label='first page'
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label='previous page'>
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='next page'
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='last page'
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  )
}

export function CollectionDetails() {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const { collectionId } = useParams()
  const [currentCollection] = useAppSelector((state) =>
    state.collections.collections.filter((collection) => collection._id === collectionId),
  )
  const { items, isLoading, error } = useAppSelector((state) => state.items)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

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

  React.useEffect(() => {
    dispatch(fetchItemsByCollectionId({ id: collectionId as string }))
  }, [])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, flexGrow: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <PrevPageButton />
        <div>Collection ID: {collectionId}</div>
        <Button variant='contained' onClick={() => navigate('createItem')}>
          Add new item
        </Button>
      </Box>
      {isLoading && <Spinner />}
      {error && <Alert severity='error'>{error.message}</Alert>}
      {items && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label='custom pagination table'>
            <TableHead>
              <TableRow>
                <TableCell>№</TableCell>
                <TableCell align='right'>Title</TableCell>
                <TableCell align='right'>Tags</TableCell>
                <TableCell align='right'>Likes</TableCell>
                <TableCell align='right'>Comments</TableCell>
                {currentCollection.extraFields?.map((field) => (
                  <TableCell key={field.id} align='right'>
                    {field.label}
                  </TableCell>
                ))}
                <TableCell align='right'>Actions</TableCell>
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
                  <TableCell align='right'>{row.tags}</TableCell>
                  <TableCell align='right'>{row.likes?.length}</TableCell>
                  <TableCell align='right'>{row.comments?.length}</TableCell>
                  {row.extraFields?.map((field) => (
                    <TableCell key={field.id} style={{ width: 160 }} align='right'>
                      {field.value === true ? (
                        <TaskAltIcon />
                      ) : field.value === false ? (
                        <RadioButtonUncheckedIcon />
                      ) : (
                        field.value
                      )}
                    </TableCell>
                  ))}
                  <TableCell style={{ width: 160 }} align='right'>
                    <IconButton aria-label='show' size='small' color='primary'>
                      <PreviewIcon fontSize='small' />
                    </IconButton>
                    <IconButton
                      aria-label='show'
                      size='small'
                      onClick={() => navigate(`items/${row._id}/edit`)}
                    >
                      <EditIcon fontSize='small' />
                    </IconButton>
                    <IconButton aria-label='show' size='small' color='error'>
                      <DeleteIcon fontSize='small' />
                    </IconButton>
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
      )}
    </Box>
  )
}
