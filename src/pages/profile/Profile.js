import { Box, Tab, Tabs } from '@mui/material'
import React, { Component } from 'react'
import MyTabPanel from '../../components/MyTabPanel'
import Wrapper from '../../components/Wrapper'
import { defineProps } from '../../utils/utils'
import MyPosts from '../posts/MyPosts'

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 0
    }
  }

  componentDidMount() {
    const a = this.props.location;
    console.log(a);
  }

  handleChange = (e, value) => {
    this.setState({tab: value});
  }

  render() {
    const { tab } = this.state;
    const a = this.props.location;

    return (
      <Wrapper>
        <Box className='profile'>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tab} onChange={this.handleChange} aria-label="basic tabs example">
              <Tab label="My Posts" {...defineProps(0)} />
              <Tab label="Liked" {...defineProps(1)} />
              <Tab label="Unliked" {...defineProps(2)} />
            </Tabs>
          </Box>
          <MyTabPanel value={tab} index={0}>
            <MyPosts {...this.props}/>
          </MyTabPanel>
          <MyTabPanel value={tab} index={1}>
            Item Two
          </MyTabPanel>
          <MyTabPanel value={tab} index={2}>
            Item Three
          </MyTabPanel>
        </Box>
      </Wrapper>
    )
  }
}
