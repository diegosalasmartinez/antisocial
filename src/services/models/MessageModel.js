export default class MessageModel {
  _id = "";
  message = "";
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