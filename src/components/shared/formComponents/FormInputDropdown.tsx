import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import React from 'react'
import { Controller } from 'react-hook-form'
import { IFormInputTextProps } from './formInputProps'

export const FormInputDropdown: React.FC<IFormInputTextProps> = ({
  name,
  control,
  label,
  selectOptions,
}) => {
  const generateSelectOptions = () => {
    return selectOptions?.map((option) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.value ? option.label : <em>{option.label}</em>}
        </MenuItem>
      )
    })
  }

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field }) => (
        <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
          <InputLabel id={name}>{label}</InputLabel>
          <Select {...field} id={name} label={label}>
            {generateSelectOptions()}
          </Select>
        </FormControl>
      )}
    />
  )
}
