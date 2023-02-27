import React from 'react'
import { IDialogMenuProps } from './dialogMenu.types'
import { useDialogMenu } from '../../../hooks/useDialogMenu'
import { additionalFields } from '../../../constants/additionalFileds'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'

export const DialogMenu: React.FC<IDialogMenuProps> = ({ createAdditionalField }) => {
  const {
    open,
    fieldType,
    fieldLabel,
    handleChangeFieldType,
    handleChangeFieldLabel,
    handleOpenDialogMenu,
    handleCloseDialogMenu,
  } = useDialogMenu()

  const onSubmit = () => {
    if (fieldType && fieldLabel) {
      createAdditionalField(fieldType, fieldLabel)
      handleCloseDialogMenu()
    }
  }

  return (
    <>
      <Button variant='outlined' onClick={handleOpenDialogMenu}>
        New Field
      </Button>
      <Dialog
        open={open}
        onClose={handleCloseDialogMenu}
        sx={{
          '& .MuiDialogContent-root': {
            paddingTop: '16px',
          },
        }}
      >
        <DialogTitle>New field</DialogTitle>
        <DialogContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '1rem',
          }}
        >
          <FormControl fullWidth size='small'>
            <InputLabel id='select-type-label'>Type</InputLabel>
            <Select
              labelId='select-type-label'
              value={fieldType}
              label='Type'
              onChange={handleChangeFieldType}
            >
              {additionalFields.map((field, ind) => (
                <MenuItem key={ind} value={field.value}>
                  {field.content}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label='Label'
            type='text'
            value={fieldLabel}
            onChange={handleChangeFieldLabel}
            size='small'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogMenu}>Cancel</Button>
          <Button onClick={onSubmit} variant='contained' disabled={!fieldType || !fieldLabel}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
