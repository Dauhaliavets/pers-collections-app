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
    <Grid container py={2} sx={{ width: '800px' }}>
      {additionalFields.map((field, i) => (
        <Grid key={i} item container justifyContent='space-between'>
          <Grid item xs={8}>
            <FormElementSwitch
              field={field}
              handleChange={handleChangeAdditionalField}
              options={{ disabled: true }}
            />
          </Grid>
          <Grid item>
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
            <Grid item>
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
