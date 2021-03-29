import joi from '@hapi/joi';

const name = joi.string();
const deliveryDate = joi.date().greater('1,1,2000');
const building_id = joi.number();
const type_id = joi.number();

export const aparmentSchema = {
  name: name.required(),
  deliveryDate: deliveryDate,
  building_id: building_id.required(),
  type_id: type_id.required(),
};
