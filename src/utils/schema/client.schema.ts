import joi from '@hapi/joi';

const name = joi.string();
const email = joi.string().email();
const phone = joi.number();
const dataController = joi.boolean();

export const clientSchema = {
  name: name.required(),
  email: email.required(),
  phone: phone.required(),
  dataController: dataController,
};
