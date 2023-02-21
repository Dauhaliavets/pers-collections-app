import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { IFormInputTextProps } from './formInputProps'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { FormHelperText } from '@mui/material'

export const FormInputDropdown: React.FC<IFormInputTextProps> = ({
  name,
  label,
  rules,
  selectOptions,
}) => {
  const { control } = useFormContext()

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
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <FormControl sx={{ m: 1, minWidth: 120 }} size='small' error={!!error}>
          <InputLabel id={name}>{label}</InputLabel>
          <Select {...field} id={name} label={label}>
            {generateSelectOptions()}
          </Select>
          {error && <FormHelperText style={{ color: 'red' }}>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  )
}
