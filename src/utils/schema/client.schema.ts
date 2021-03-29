import joi from '@hapi/joi';

const name = joi.string();
const lastname = joi.string();
const email = joi.string().email();
const phone = joi.number();
const dataController = joi.boolean();

export const clientSchema = {
  name: name.required(),
  lastname: lastname.required(),
  email: email.required(),
  phone: phone.required(),
  dataController: dataController,
};
