var Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

module.exports = data => {
  let errors = {};
  const schema = {
    category: Joi.objectId().required(),
    name: Joi.string()
      .min(2)
      .max(200)
      .required()
      .trim()
  };

  const { error } = Joi.validate(data, schema, { abortEarly: false });
  if (error) {
    // Set all errors
    error.details.map(err => {
      errors[err.path] = err.message;
    });
  } else {
    errors = false;
  }

  return { errors };
};
