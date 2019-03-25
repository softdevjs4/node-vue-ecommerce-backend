const Joi = require("joi");

module.exports = data => {
  let errors = {};
  const schema = {
    name: Joi.string()
      .min(2)
      .max(100)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .max(50)
      .required(),
    password_confirmation: Joi.any()
      .valid(Joi.ref('password'))
      .required()
      .options({ language: { any: { allowOnly: 'must match password' } } })
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
