const setValidationErrors = require('../../../utils/setValidationErrors');
var Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

module.exports = data => {
  let errors = {};
  const schema = {
    optionGroup: Joi.objectId().required(),
    name: Joi.string()
      .min(1)
      .max(200)
      .required()
      .trim(),
    other: Joi.string()
      .max(200)
      .allow(null)
      .allow('')
      .trim(),
    note: Joi.string()
      .max(200)
      .allow(null)
      .allow('')
      .trim()

  };

  const { error } = Joi.validate(data, schema, { abortEarly: false });
  // Set validation errors
  return setValidationErrors(error);
};
