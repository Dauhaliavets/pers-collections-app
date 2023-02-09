import React from 'react'
import { SelectChangeEvent } from '@mui/material'

const useDialogMenu = () => {
  const [open, setOpen] = React.useState<boolean>(false)
  const [fieldType, setFieldType] = React.useState('')
  const [fieldLabel, setFieldLabel] = React.useState('')

  const handleChangeFieldType = (event: SelectChangeEvent) => {
    setFieldType(event.target.value as string)
  }

  const handleChangeFieldLabel = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldLabel(event.target.value)
  }

  const handleCloseDialogMenu = () => {
    setFieldType('')
    setFieldLabel('')
    setOpen(false)
  }

  const handleOpenDialogMenu = () => {
    setOpen(true)
  }

  return {
    open,
    fieldType,
    fieldLabel,
    handleChangeFieldType,
    handleChangeFieldLabel,
    handleCloseDialogMenu,
    handleOpenDialogMenu,
  }
}

export { useDialogMenu }
