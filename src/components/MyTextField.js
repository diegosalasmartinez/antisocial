import { TextField } from '@mui/material'
import React, { Component } from 'react'

export default class MyTextField extends Component {
  render() {
    const { param = '', label = '', value = '', type = 'text', mb = '1.25rem', multiline, rows } = this.props;

    return (
      <TextField id={param} label={label} value={value} fullWidth variant='outlined' type={type} sx={{mb: mb}} multiline={multiline} rows={rows} onChange={this.props.onChange(param)} autoComplete='new-password'/>
    )
  }
}
