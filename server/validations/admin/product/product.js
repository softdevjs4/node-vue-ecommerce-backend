const setValidationErrors = require('../../../utils/setValidationErrors');
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

module.exports = data => {
  const schema = {
    sku: Joi.string().required().trim(),
    category: Joi.objectId().required(),
    subCategory: Joi.objectId().required(),
    manufacturer: Joi.object().allow(null).allow(''),
    name: Joi.string()
      .min(1)
      .max(400)
      .required()
      .trim(),
    model: Joi.string().min(2).max(200).allow(null).allow(''),
    weight: Joi.number().allow(null).allow(''),
    sortDesc: Joi.string()
      .min(2)
      .max(200)
      .required()
      .trim(),
    longDesc: Joi.string().allow(null).allow(''),
    price: Joi.number().required(),
    stock: Joi.number().required(),
    inStock: Joi.boolean().allow(null).allow(''),
    isFeature: Joi.boolean().allow(null).allow(''),
    status: Joi.boolean().required(),
    flashSale: Joi.object().allow(null).allow(''),
    specialSale: Joi.object().allow(null).allow(''),
    attributes: Joi.array().allow(null).allow(''),
    images: Joi.array().allow(null).allow(''),

  };

  const {
    error
  } = Joi.validate(data, schema, {
    abortEarly: false
  });
  // Set validation errors
  return setValidationErrors(error);
};