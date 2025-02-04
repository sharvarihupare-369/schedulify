import Joi from "joi";

export const validateRegister = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Name is required", // check for both value and field if any one is missing throws error
    "string.min": "Name must be at least 3 characters long.",
    "string.max": "Name must not exceed 50 characters.",
    "any.required": "Name is required", // used to check only if field is present or not
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com"] } })
    .required()
    .messages({
      "string.email": "Please provide a valid email address.",
      "any.required": "Email is required",
    }),
  password: Joi.string()
    .min(8)
    .pattern(/[A-Z]/, "uppercase")
    .pattern(/[0-9]/, "number")
    .pattern(/[!@#$%^&*]/, "special character")
    .required()
    .messages({
      "string.empty": "Password is required.",
      "string.min": "Password must be at least 8 characters long.",
      "string.pattern.name": "Password must contain at least {#name}.",
      "any.required": "Password is required.",
    }),
});

export const validateLogin = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().required(),
});
