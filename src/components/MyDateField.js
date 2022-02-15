import React, { Component } from 'react'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DateAdapter from '@mui/lab/AdapterMoment'
import { MobileDatePicker } from '@mui/lab'
import { TextField } from '@mui/material'

export default class MyDateField extends Component {
  render() {
    const { param = '', label = '', value } = this.props;
    return (
      <LocalizationProvider dateAdapter={DateAdapter}>
        <MobileDatePicker inputFormat='DD/MM/yyyy' label={label} value={value} onChange={this.props.onChange(param, false, true)} renderInput={(params) => <TextField {...params} />}/>
      </LocalizationProvider>
    )
  }
}

