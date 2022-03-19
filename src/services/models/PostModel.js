import CategoryModel from './CategoryModel'

export default class PostModel {
  _id = "";
  title = "";
  body = "";
  author = "";
  date = new Date();
  category = new CategoryModel();
  replies = [];
}

const validate = (post) => {
  let errors = {
    title: null,
    body: null,
    "category._id": null
  }
  if (!post.title) {
    errors.title = "Title can't be empty";
  }
  if (!post.body) {
    errors.body = "Body can't be empty";
  }
  if (!post.category._id) {
    errors["category._id"] = "You must choose one category";
  }
  return errors;
}

export { validate }