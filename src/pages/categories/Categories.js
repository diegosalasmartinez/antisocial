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
      categoryName: '',
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
      this.setState({categorySelected: '', categoryName: '', posts: [], loading: false})
    }
  } 

  getPosts = async (categoryId, categoryName = '') => {
    this.setState({loading: true});
    const posts = await this.props.getPostsByCategory(categoryId);
    const postReducer = this.props.post;
    if (postReducer.failed) {
      this.props.showNotification(postReducer.error);
      await this.props.clearErrorPost();
    } else {
      this.setState({categorySelected: categoryId, categoryName: categoryName, posts, loading: false})
    }
  }

  onClickCategory = (categoryId, categoryName) => {
    this.props.navigate("/categories/"+categoryId);
    this.getPosts(categoryId, categoryName);
  }

  updatePosts = (post) => {
    const ind = this.state.posts.findIndex(p => p._id === post._id)
    if (ind >= 0) {
      let posts = [...this.state.posts];
      posts[ind] = {...post};
      this.setState({posts: posts});
    }
  }

  updateAuthor = (authorId, numFollowers) => {
    let posts = [...this.state.posts];
    for (let i=0; i<this.state.posts.length; i++) {
      if (this.state.posts[i].author._id === authorId) {
        let post = {...this.state.posts[i]};
        let author = {...post.author};
        author.followersNumber = numFollowers;
        post.author = {...author};
        posts[i] = {...post};
      }
    }
    this.setState({posts: posts});    
  }

  showCategories = () => {
    this.props.navigate("/categories");
    this.setState({categorySelected: '', categoryName: '', posts: [], loading: false});
  }

  render() {
    const { categorySelected, categoryName, loading, posts } = this.state;
    const { category } = this.props;
    const { categories } = category;

    return (
      <Wrapper loading={loading}>
        { categorySelected === '' ? 
          <CategoriesOptions categories={categories} onClickCategory={this.onClickCategory}/>
          :
          <CategoriesPosts {...this.props} posts={posts} categoryName={categoryName} updatePosts={this.updatePosts} updateAuthor={this.updateAuthor} showCategories={this.showCategories}/>
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
