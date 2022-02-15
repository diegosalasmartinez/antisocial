import React, { Component } from 'react'
import Wrapper from '../components/Wrapper';

export default class A extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  componentDidMount() { 
    setTimeout(() => {  this.setState({loading: false}); }, 10000);
  }

  render() {
    const { loading } = this.state

    return (
      <Wrapper loading={loading}>
        <div style={{backgroundColor: 'red'}}>
          SOY EL COMPONENTE A
        </div>
      </Wrapper>
    )
  }
}
