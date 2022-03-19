import React, { Component } from 'react'
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material'

export default class MySelectField extends Component {
  render() {
    const { param, label, value = '', errors = {}, data = [] } = this.props
    const error = errors[param] != null;
    const errorMessage = error ? errors[param] : '';

    return (
      <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth error={error} size='small'>
        { label && <InputLabel id={param}>{label}</InputLabel> }
        <Select labelId={param} id={param} value={value} label={label} onChange={this.props.onChange(param)}>
          { data.map(d => <MenuItem key={d.value} value={d.value}>{d.label}</MenuItem>) }
        </Select>
        { error && <FormHelperText>{errorMessage}</FormHelperText> }
      </FormControl>
    )
  }
}
