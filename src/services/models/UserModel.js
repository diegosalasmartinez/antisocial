export default class UserModel {
  _id = "";
  name = "";
  lastName = "";
  email = "";
  username = "";
  password = "";
  description = "";
  posts = [];
  postsNumber = 0;
  followers = [];
  followersNumber = 0;
  following = [];
  followingNumber = 0;
  likes = [];
  dislikes = [];
  saves = [];
  birthday = new Date();
}

const validate = (user, validateCredentials) => {
  let errors = {
    username: null,
    password: null,
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
  if (validateCredentials) {
    if (!user.username) {
      errors.username = "Username is mandatory";
    }
    if (!user.password) {
      errors.password = "Password is mandatory";
    }
  }
  return errors;
}

const validateEditInfo = (user) => {
  let errors = {
    name: null,
    lastName: null,
  }

  if (!user.name) {
    errors.name = "Name is mandatory";
  }
  if (!user.lastName) {
    errors.lastName = "Last name is mandatory";
  }
  return errors;
}

export { validate, validateEditInfo }