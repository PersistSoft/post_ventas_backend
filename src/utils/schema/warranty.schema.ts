import joi from '@hapi/joi';

const clientSing = joi.number();
const apartmentId = joi.number();
const warrantyTypes = joi.array().items(joi.number());
const statusId = joi.number();
const value = joi.number();
const contactInfo = joi.number();

export const WarrantySchema = {
  clientSing: clientSing,
  apartmentId: apartmentId.required(),
  warrantyTypes: warrantyTypes.required(),
  statusId: statusId.required(),
  value: value.required(),
  contactInfo: contactInfo.required()
}