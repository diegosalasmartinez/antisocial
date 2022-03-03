import React, { Component } from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'

export default class MySelectField extends Component {
  render() {
    const { param, label = '', value = '', data = [] } = this.props

    return (
      <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth>
        <InputLabel id={param}>{label}</InputLabel>
        <Select labelId={param} id={param} value={value} label={label} onChange={this.props.onChange(param)}>
          { data.map(d => <MenuItem key={d.value} value={d.value}>{d.label}</MenuItem>) }
        </Select>
      </FormControl>
    )
  }
}
