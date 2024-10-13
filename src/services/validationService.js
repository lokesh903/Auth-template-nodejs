const Joi = require("joi");

// Common field schemas
const emailSchema = Joi.string().email().required().label("Email");

// Validation service module
const ValidationService = {
  validateOtp: (data) =>
    Joi.object({
      email: emailSchema,
      otpNumber: Joi.number().integer().required().label("OTP"),
    }).validate(data),

  validateLeadData: (data) => {
    const schema = Joi.object({
      sold_address: Joi.string(),
      agent_rating: Joi.string().optional().allow(null),
      MLS_id: Joi.string(),
      email: Joi.string().email(),
      mobile_number: Joi.string(),
      agent_name: Joi.string(),
    });

    return schema.validate(data, { abortEarly: false });
  },
  validateUserRegistrationData: (data) => {
    const schema = Joi.object({
      name: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string(),
      role: Joi.string().optional().allow(null),

    });

    return schema.validate(data, { abortEarly: false });
  },
  validateUserLoginData: (data) => {
    const schema = Joi.object({
      email: Joi.string().email(),
      password: Joi.string(),
    });

    return schema.validate(data, { abortEarly: false });
  },
};

module.exports = ValidationService;
