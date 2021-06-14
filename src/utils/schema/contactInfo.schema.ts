import joi from '@hapi/joi';

const name = joi.string();

const email = joi.string().email();
const phone = joi.string();

export const ContactInfoSchema = {
  name: name.required(),

  email: email.required(),
  phone: phone.required(),
};
