import React, { Component } from 'react'
import { Snackbar, Alert } from '@mui/material'

const MyAlert = React.forwardRef(function MyAlert(props, ref) {
  return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default class MyNotification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vertical: 'top',
      horizontal: 'right',
    }
  }

  handleClose = () => {
    this.props.closeNotification();
  }

  render() {
    const { open, message, severity } = this.props
    const { vertical, horizontal } = this.state
    return (
      <Snackbar 
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={this.handleClose}
        key={vertical + horizontal}
      >
        <MyAlert severity={severity}>{message}</MyAlert>
      </Snackbar>
    )
  }
}
