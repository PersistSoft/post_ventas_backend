import joi from '@hapi/joi';

const name = joi.string();
const floors = joi.number();
const aparmentsNumber = joi.number();
const project_id = joi.number();

export const BuildingSchema = {
  name: name.required(),
  floors: floors.required(),
  aparmentsNumber: aparmentsNumber.required(),
  project_id: project_id.required(),
};
