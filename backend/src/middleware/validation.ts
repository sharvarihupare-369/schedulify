import Joi from "joi";

export const validateRegister = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters long.",
    "string.max": "Name must not exceed 50 characters.",
    "any.required": "Name is required",
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

  export const validateTaskCreation = Joi.object({
    userId: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/, "ObjectId"),
    title: Joi.string().min(3).max(100).required().messages({
      "string.empty": "Title is required",
      "string.min": "Title must be at least 3 characters long.",
      "string.max": "Title must not exceed 100 characters.",
      "any.required": "Title is required",
    }),
    description: Joi.string().min(10).max(500).allow("").optional().messages({
      "string.min": "Description must be at least 10 characters long.",
      "string.max": "Description must not exceed 500 characters.",
    }),
    status: Joi.string()
      .valid("To do", "In Progress", "Completed")
      .default("To do"),
    priority: Joi.string()
      .valid("High", "Medium", "Low")
      .default("Medium"),
    due_date: Joi.date().min("now").required().messages({
      "date.min": "Due date must be greater than or equal to today",
      "any.required": "Due date is required",
    }),
  });
