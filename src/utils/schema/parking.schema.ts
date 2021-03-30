import joi from '@hapi/joi';

const name = joi.string();
const aparment_id = joi.number();

export const ParkingSchema = {
  name: name.required(),
  parment_id: aparment_id.required(),
};
