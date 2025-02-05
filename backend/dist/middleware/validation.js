"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTaskCreation = exports.validateLogin = exports.validateRegister = void 0;
const joi_1 = __importDefault(require("joi"));
exports.validateRegister = joi_1.default.object({
    name: joi_1.default.string().min(3).max(50).required().messages({
        "string.empty": "Name is required",
        "string.min": "Name must be at least 3 characters long.",
        "string.max": "Name must not exceed 50 characters.",
        "any.required": "Name is required",
    }),
    email: joi_1.default.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com"] } })
        .required()
        .messages({
        "string.email": "Please provide a valid email address.",
        "any.required": "Email is required",
    }),
    password: joi_1.default.string()
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
exports.validateLogin = joi_1.default.object({
    email: joi_1.default.string().email({ minDomainSegments: 2 }).required(),
    password: joi_1.default.string().required(),
});
exports.validateTaskCreation = joi_1.default.object({
    userId: joi_1.default.string()
        .pattern(/^[0-9a-fA-F]{24}$/, "ObjectId"),
    title: joi_1.default.string().min(3).max(100).required().messages({
        "string.empty": "Title is required",
        "string.min": "Title must be at least 3 characters long.",
        "string.max": "Title must not exceed 100 characters.",
        "any.required": "Title is required",
    }),
    description: joi_1.default.string().min(10).max(500).optional().messages({
        "string.min": "Title must be at least 10 characters long.",
        "string.max": "Title must not exceed 500 characters.",
    }),
    status: joi_1.default.string()
        .valid("To do", "In Progress", "Completed")
        .default("To do")
        .messages({
        "any.only": "Status must be one of the following : To do ,In Progress, Completed",
    }),
    priority: joi_1.default.string()
        .valid("High", "Medium", "Low")
        .default("Medium")
        .messages({
        "any.only": "Status must be one of the following : High , Medium, Low",
    }),
    due_date: joi_1.default.date().min("now").required().messages({
        "date.min": "Due date must be greater than or equal to today",
        "any.required": "Due date is required",
    }),
});
//# sourceMappingURL=validation.js.map