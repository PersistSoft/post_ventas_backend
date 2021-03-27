import joi from '@hapi/joi';

const name = joi.string();
const address = joi.string();

export const ProjectSchema = {
  name: name.required(),
  address: address.required(),
};
