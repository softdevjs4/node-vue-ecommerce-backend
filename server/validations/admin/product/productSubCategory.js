const setValidationErrors = require('../../../utils/setValidationErrors');
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

module.exports = data => {
  const schema = {
    category: Joi.objectId().required(),
    name: Joi.string()
      .min(2)
      .max(200)
      .required()
      .trim()
  };

  const { error } = Joi.validate(data, schema, { abortEarly: false });
  // Set validation errors
  return setValidationErrors(error);
};
