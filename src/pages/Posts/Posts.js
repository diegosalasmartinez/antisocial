import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Wrapper from '../../components/Wrapper'
import * as authActions from '../../services/redux/actions/authActions'

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageLoading: true
    }
  }

  componentDidMount() { 
    this.setState({pageLoading: false});
  }

  render() {
    const { pageLoading } = this.state;

    return (
      <Wrapper pageLoading={pageLoading}>
        <div>Posts</div>
      </Wrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(authActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)