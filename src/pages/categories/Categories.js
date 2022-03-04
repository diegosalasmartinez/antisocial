import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import { getCategoryColors } from '../../theme/colors'
import Wrapper from '../../components/Wrapper'
import CategoriesOptions from './CategoriesOptions'

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categorySelected: '',
      posts: [],
      loading: true
    }
  }

  componentDidMount() { 
    const { pathname = []} = this.props.location;
    const categoryId = pathname.slice(12);
    if (categoryId !== '') {
      this.getPosts(categoryId);
    }

    this.setState({loading: false})
  }

  componentDidUpdate(prevProps, prevState) { 
    const prevPathname = prevProps.location.pathname;
    const pathname = this.props.location.pathname;

    if (prevPathname !== pathname && pathname === '/categories') {
      this.setState({categorySelected: '', posts: [], loading: false})
    }
  } 

  getPosts = async (categoryId) => {
    this.setState({loading: true});

    let posts = [];
    this.setState({categorySelected: categoryId, posts, loading: false})
  }

  onClickCategory = (categoryId) => {
    this.props.navigate("/categories/"+categoryId);
    this.getPosts(categoryId);
  }

  render() {
    const { categorySelected, loading, posts } = this.state
    const { category } = this.props;
    const { categories } = category;

    return (
      <Wrapper loading={loading}>
        { categorySelected === '' ? 
          <CategoriesOptions categories={categories} onClickCategory={this.onClickCategory}/>
          :
          <div>HOLA</div>
        }
      </Wrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    category: state.category,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // ...bindActionCreators(userActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories)
