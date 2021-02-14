const Joi = require('@hapi/joi');

//validation
const registerValidation = (data) => {
    const schema = require = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
  });
return schema.validate(data);
};

module.exports = {
    registerValidation,
};