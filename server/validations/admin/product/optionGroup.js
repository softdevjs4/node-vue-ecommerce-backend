const setValidationErrors = require('../../../util/setValidationErrors');
const Joi = require("joi");

module.exports = data => {
  const schema = {
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
