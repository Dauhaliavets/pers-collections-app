import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  DialogActions,
  Button,
  MenuItem,
  TextField,
} from '@mui/material'
import { additionalFields } from '../../constants/additionalFileds'
import { useDialogMenu } from '../../hooks/useDialogMenu'
// import { useAdditionalFields } from '../../hooks/useAdditionalFileds'

interface IDialogMenuProps {
  createAdditionalField: (fieldType: string, fieldLabel: string) => void
}

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

  // const { createAdditionalField } = useAdditionalFields()

  return (
    <>
      <Button variant='outlined' onClick={handleOpenDialogMenu}>
        Add New Field
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
          <Button
            onClick={() => {
              createAdditionalField(fieldType, fieldLabel)
              handleCloseDialogMenu()
            }}
            variant='contained'
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
