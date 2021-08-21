import joi from '@hapi/joi';

const clientSing = joi.number();
const apartmentId = joi.number();
const warrantyTypes = joi.array().items(joi.number());
const statusId = joi.number();
const value = joi.number();
const contactInfo = joi.number();
const closeAt = joi.date();
const explanation = joi.string();

export const WarrantySchema = {
  clientSing: clientSing,
  apartmentId: apartmentId.required(),
  warrantyTypeIds: warrantyTypes.required(),
  statusId: statusId.required(),
  value: value,
  contactInfoId: contactInfo.required(),
  closeAt: closeAt,
  explanation: explanation.required(),
};
