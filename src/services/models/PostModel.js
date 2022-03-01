import CategoryModel from './CategoryModel'

export default class PostModel {
  _id = "";
  title = "";
  body = "";
  author = "";
  date = new Date();
  category = new CategoryModel();
}

const validate = (user) => {
  let errors = {
    DNI: null,
    name: null,
    lastName: null,
    email: null,
    phone: null,
    username: null,
    password: null
  }
  if (!user.personInfo.DNI) {
    errors.DNI = "DNI is mandatory";
  }
  if (!user.personInfo.name) {
    errors.name = "Name is mandatory";
  }
  if (!user.personInfo.lastName) {
    errors.lastName = "Last name is mandatory";
  }
  if (!user.personInfo.email) {
    errors.email = "Email is mandatory";
  }
  if (!user.personInfo.phone) {
    errors.phone = "Phone is mandatory";
  }
  return errors;
}

export { validate }