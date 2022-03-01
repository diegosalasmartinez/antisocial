import React, { Component } from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'

export default class MySelectField extends Component {
  render() {
    const { id, label = '', value = '' } = this.props

    return (
      <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth>
        <InputLabel id={id}>{label}</InputLabel>
        <Select
          labelId={id}
          id={id}
          value={value}
          label={label}
          onChange={this.props.onChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    )
  }
}
