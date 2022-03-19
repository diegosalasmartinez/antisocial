import React, { Component } from 'react'
import { TextField } from '@mui/material'

export default class MyTextField extends Component {
  render() {
    const { param = '', label = '', value = '', errors = {}, type = 'text', mb = '1.25rem', multiline, rows } = this.props;
    const error = errors[param] != null;
    const errorMessage = error ? errors[param] : '';

    return (
      <TextField 
        id={param} 
        label={label} 
        value={value} 
        fullWidth 
        variant='outlined' 
        type={type} 
        sx={{mb: mb}} 
        multiline={multiline} 
        rows={rows} 
        onChange={this.props.onChange(param)} 
        autoComplete='new-password'
        error={error}
        helperText={errorMessage}
        size='small'
      />
    )
  }
}
