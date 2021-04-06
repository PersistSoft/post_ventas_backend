import joi from '@hapi/joi';

const name = joi.string();
const lastname = joi.string();
const email = joi.string().email();
const phone = joi.string();

export const ContactInfoSchema = {
  name: name.required(),
  lastname: lastname.required(),
  email: email.required(),
  phone: phone.required()
};
