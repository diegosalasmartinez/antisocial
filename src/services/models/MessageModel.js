export default class MessageModel {
  _id = "";
  message = "";
  date = new Date();
}


const validate = (message) => {
  let errors = {
    message: null,
  }
  if (!message.message) {
    errors.message = "Message can't be empty";
  }
  return errors;
}

export { validate }