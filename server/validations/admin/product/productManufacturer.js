const setValidationErrors = require('../../../utils/setValidationErrors');
const Joi = require("joi");

module.exports = data => {
  const schema = {
    name: Joi.string()
      .min(2)
      .max(200)
      .required()
      .trim(),
    url: Joi.string()
      .allow(null)
      .allow('')
      .uri()
      .min(2)
      .trim(),
    image: Joi.allow(null)
  };

  const {
    error
  } = Joi.validate(data, schema, {
    abortEarly: false
  });
  // Set validation errors
  return setValidationErrors(error);
};