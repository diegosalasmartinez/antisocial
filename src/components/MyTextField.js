import { TextField } from '@mui/material'
import React, { Component } from 'react'

export default class MyTextField extends Component {
  render() {
    const { param = '', label = '', value = '', type = 'text' } = this.props;

    return (
      <TextField id={param} label={label} value={value} fullWidth variant='outlined' type={type} onChange={this.props.onChange(param)} autoComplete='new-password'/>
    )
  }
}
