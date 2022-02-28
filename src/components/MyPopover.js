import React, { Component } from 'react'
import { Popover } from '@mui/material'
import colors from '../theme/colors';

export default class MyPopover extends Component {
  render() {
    const { id, open, anchorEl, anchorOrigin = {vertical: 'bottom', horizontal: 'left'} } = this.props;
    return (
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={anchorOrigin}
        onClose={this.props.onClose}
        // sx={{backgroundColor: colors.PRIMARY}}
      >
        {this.props.children}
      </Popover>
    )
  }
}
