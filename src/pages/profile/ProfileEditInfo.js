import React, { Component } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import MyTextField from '../../components/MyTextField'
import MyButton from '../../components/MyButton'
import { getInputValue, objIsNull } from '../../utils/utils'
import UserModel, { validateEditInfo } from '../../services/models/UserModel'

export default class ProfileEditInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newProfile: new UserModel(),
      errors: {}
    }
  }

  componentDidMount() { 
    this.setState({newProfile: {...this.props.profile}});
  }

  onChange = (key, isNumeric = false) => (e = {}) => {
    const { newProfile } = this.state;
    const profileUpdated = getInputValue(newProfile, e, key, isNumeric);
    this.setState({newProfile: profileUpdated});
  }

  onEdit = () => {
    const { newProfile } = this.state;
    const errors = validateEditInfo(newProfile);
    if (objIsNull(errors)) {
      this.props.onEdit(newProfile);
    }
    this.setState({errors: errors});
  }

  render() {
    const { errors, newProfile } = this.state;
    const { btnLoading } = this.props;
    const { name, lastName, description } = newProfile;

    return (
      <Box className='create-post'>
        <Typography className='name' textAlign="left" sx={{ fontSize: 20, fontWeight: 'bold' }}>
          Edit profile
        </Typography>
        <Box className='form' sx={{mt: '1rem'}}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <MyTextField param='name' label='Name' value={name} errors={errors} onChange={this.onChange}/>
            </Grid>
            <Grid item xs={6}>
              <MyTextField param='lastName' label='Last name' value={lastName} errors={errors} onChange={this.onChange}/>
            </Grid>
          </Grid>
          <MyTextField param='description' label='Description' value={description} multiline={true} rows={4} mb={0} onChange={this.onChange}/>
        </Box>
        <Box className='jc-r'>
          <MyButton text='Cancel' variant='secondary' onClick={this.props.onCancel}/>
          <MyButton text='Post' loading={btnLoading} onClick={this.onEdit}/>
        </Box>
      </Box>
    )
  }
}
