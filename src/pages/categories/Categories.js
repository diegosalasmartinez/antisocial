import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as postActions from '../../services/redux/actions/postActions'
import Wrapper from '../../components/Wrapper'
import CategoriesOptions from './CategoriesOptions'
import CategoriesPosts from './CategoriesPosts'

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
    const posts = await this.props.getPosts(categoryId);
    const postReducer = this.props.post;
    if (postReducer.failed) {
      this.props.showNotification(postReducer.error);
      await this.props.clearErrorPost();
    } else {
      this.setState({categorySelected: categoryId, posts, loading: false})
    }
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
          <CategoriesPosts/>
        }
      </Wrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    category: state.category,
    post: state.post,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(postActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories)
