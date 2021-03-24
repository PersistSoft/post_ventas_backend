import joi from '@hapi/joi';

const name = joi.string();

export const ApartmentTypeSchema = {
  name: name.required()
}

export const RoleSchema = {
  name: name.required()
}

export const StatusSchema = {
  name: name.required()
}

export const WarrantyTypeSchema = {
  name: name.required()
}