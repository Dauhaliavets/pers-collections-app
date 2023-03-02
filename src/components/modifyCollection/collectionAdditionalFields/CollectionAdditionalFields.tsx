import React from 'react'

import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Checkbox from '@mui/material/Checkbox'
import DeleteIcon from '@mui/icons-material/Delete'
import { FormElementSwitch } from '../../shared/formElementSwitch/FormElementSwitch'
import { IAdditionalField } from '../../../models/additionalField.model'
import { FormattedMessage } from 'react-intl'

interface ICollectionAdditionalFieldsProps {
  action: 'create' | 'edit'
  additionalFields: IAdditionalField[]
  handleChangeAdditionalField: (
    fieldId: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void
  handleChangeIsVisible: (event: React.ChangeEvent<HTMLInputElement>, fieldId: string) => void
  handleDeleteField: (fieldId: string) => void
}

export const CollectionAdditionalFields: React.FC<ICollectionAdditionalFieldsProps> = ({
  action,
  additionalFields,
  handleChangeAdditionalField,
  handleChangeIsVisible,
  handleDeleteField,
}) => {
  return (
    <Grid container py={2} sx={{ width: { xs: '100%', sm: '600px', md: '800px' } }}>
      {additionalFields.map((field, i) => (
        <Grid
          key={i}
          item
          container
          justifyContent='space-between'
          sx={{ width: { xs: '100%', sm: '600px', md: '800px' } }}
        >
          <Grid item xs={12} sm={8}>
            <FormElementSwitch
              field={field}
              handleChange={handleChangeAdditionalField}
              options={{ disabled: true }}
            />
          </Grid>
          <Grid item xs={10} sm={3} sx={{ textAlign: { xs: 'end' } }}>
            <Checkbox
              id='isVisibleField'
              checked={field.visible}
              onChange={(e) => handleChangeIsVisible(e, field.id)}
            />
            <label htmlFor='isVisibleField'>
              {field.visible ? (
                <FormattedMessage id='app.collection.formFields.additionalFieldStatus.visible' />
              ) : (
                <FormattedMessage id='app.collection.formFields.additionalFieldStatus.inVisible' />
              )}
            </label>
          </Grid>
          {action === 'create' && (
            <Grid item xs={2} sm={1} sx={{ textAlign: { xs: 'end' } }}>
              <IconButton onClick={() => handleDeleteField(field.id)}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          )}
        </Grid>
      ))}
    </Grid>
  )
}
