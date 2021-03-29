import joi from '@hapi/joi';

const name = joi.string();
const aparment_id = joi.number();

export const StorageUnitSchema = {
  name: name.required(),
  parment_id: aparment_id.required(),
};
