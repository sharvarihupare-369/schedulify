"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.softDeleteTask = exports.deleteTask = exports.updateTask = exports.getTasks = exports.createTask = void 0;
const TaskModel_1 = __importDefault(require("../models/TaskModel"));
const validation_1 = require("../middleware/validation");
const createTask = async (req, res) => {
    try {
        const { error } = validation_1.validateTaskCreation.validate(req.body);
        if (error) {
            const errMsg = error.details.map((er) => er.message).join(", ");
            res.status(400).send({ success: false, message: errMsg });
            return;
        }
        const { title, due_date } = req.body;
        // First, check if a non-deleted task already exists with the same title and userId
        const existingTask = await TaskModel_1.default.findOne({
            title,
            userId: req.userId,
            deletedAt: { $exists: false },
        });
        if (existingTask) {
            res.status(400).send({
                success: false,
                message: "Task with this title already exists",
            });
        }
        const userId = req.userId;
        const task = await TaskModel_1.default.create({ ...req.body, userId: userId });
        res.status(201).send({
            success: true,
            message: "Task Created Successfully",
            data: task,
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
exports.createTask = createTask;
const getTasks = async (req, res) => {
    try {
        const userId = req.userId;
        const { priority, status } = req.query;
        const filters = {
            userId,
        };
        if (priority)
            filters.priority = priority;
        if (status)
            filters.status = status;
        const alltasks = await TaskModel_1.default.find(filters);
        res.status(200).send({
            success: true,
            message: "Fetched all tasks successfully",
            data: alltasks,
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
exports.getTasks = getTasks;
const updateTask = async (req, res) => {
    try {
        const userId = req.userId;
        const { id } = req.params;
        const task = await TaskModel_1.default.findByIdAndUpdate({ _id: id, userId }, req.body, { new: true });
        if (!task) {
            res
                .status(400)
                .send({ success: false, message: "No task found.", data: task });
        }
        res.status(200).send({
            success: true,
            message: "Task Updated Successfully",
            data: task,
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
exports.updateTask = updateTask;
const deleteTask = async (req, res) => {
    try {
        const userId = req.userId;
        const { id } = req.params;
        const task = await TaskModel_1.default.findByIdAndDelete({ _id: id, userId });
        if (!task) {
            res.status(400).send({ success: false, message: "No task found." });
        }
        res.status(200).send({
            success: true,
            message: "Task Deleted Successfully",
            data: task,
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
exports.deleteTask = deleteTask;
const softDeleteTask = async (req, res) => {
    try {
        const userId = req.userId;
        const { id } = req.params;
        const task = await TaskModel_1.default.findOneAndUpdate({ _id: id, userId }, { deletedAt: new Date() }, { new: true });
        if (!task) {
            res.status(400).send({ success: false, message: "No task found." });
        }
        res.status(200).send({
            success: true,
            message: "Task Deleted Successfully",
            data: task,
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
exports.softDeleteTask = softDeleteTask;
//# sourceMappingURL=TaskController.js.map