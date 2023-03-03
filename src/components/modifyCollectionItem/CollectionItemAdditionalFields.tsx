import React from 'react'
import { FormElementSwitch } from '../shared/formElementSwitch/FormElementSwitch'
import { ICollectionItemAdditionalFieldsProps } from './collectionItemAdditionalFields.types'
import Box from '@mui/material/Box'

export const CollectionItemAdditionalFields: React.FC<ICollectionItemAdditionalFieldsProps> = ({
  additionalFields,
  onChange,
}) => {
  return (
    <>
      {additionalFields.map((field, i) => (
        <Box
          key={i}
          py={1}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <FormElementSwitch field={field} handleChange={onChange} />
        </Box>
      ))}
    </>
  )
}
