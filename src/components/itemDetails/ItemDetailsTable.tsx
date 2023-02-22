import React from 'react'
import { IItemDetailsTableProps } from './itemDetails.types'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'

export const ItemDetailsTable: React.FC<IItemDetailsTableProps> = ({ currentItem }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          <TableRow hover>
            <TableCell variant='head' style={{ minWidth: 80, maxWidth: 150 }}>
              Title:{' '}
            </TableCell>
            <TableCell>{currentItem.title}</TableCell>
          </TableRow>
          <TableRow hover>
            <TableCell variant='head' style={{ minWidth: 80, maxWidth: 150 }}>
              Tags:{' '}
            </TableCell>
            <TableCell>{currentItem.tags.join(' ')}</TableCell>
          </TableRow>
          {currentItem.extraFields?.map((field, ind) => (
            <TableRow key={ind} hover>
              <TableCell variant='head' style={{ minWidth: 80, maxWidth: 150 }}>
                {field.label}
              </TableCell>
              <TableCell>
                {field.value === true ? (
                  <TaskAltIcon />
                ) : field.value === false ? (
                  <RadioButtonUncheckedIcon />
                ) : (
                  field.value
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
