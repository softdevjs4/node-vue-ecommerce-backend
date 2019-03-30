module.exports = (errorPayload) => {
  let errors = {};
  if (errorPayload) {
    // Set all errors
    errorPayload.details.map(err => {
      errors[err.path] = err.message;
    });
  } else {
    errors = false;
  }

  return { errors };
}