import joi from '@hapi/joi';

const username = joi.string();
const name = joi.string();
const lastName = joi.string();
const email = joi.string().email();
const password = joi.string();
const rolId = joi.number();

export const SignUpSchema = {
  username: username.required(),
  name: name.required(),
  lastName: lastName.required(),
  email: email.required(),
  password: password.required(),
  rolId: rolId.required()
}