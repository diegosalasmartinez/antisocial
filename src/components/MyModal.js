import { Box, Modal, Typography } from '@mui/material'
import React, { Component } from 'react'

export default class MyModal extends Component {
  render() {
    const { open, name } = this.props

    return (
      <Modal
        open={open}
        className='modal'
        aria-labelledby={"modal-" + name}
        aria-describedby={"modal-" + name}
        onClose={(_, reason) => { 
          if (reason !== 'backdropClick') {
            this.props.onClose();
          }
        }}
      >
        <Box className='modal-content'>
          {this.props.children}
        </Box>
      </Modal>
    )
  }
}
