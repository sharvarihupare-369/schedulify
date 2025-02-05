"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_1 = __importDefault(require("../middleware/authentication"));
const TaskController_1 = require("../controllers/TaskController");
const router = express_1.default.Router();
router.post("/create", authentication_1.default, TaskController_1.createTask);
router.get("/", authentication_1.default, TaskController_1.getTasks);
router.put("/:id", authentication_1.default, TaskController_1.updateTask);
router.delete("/:id", authentication_1.default, TaskController_1.deleteTask);
exports.default = router;
//# sourceMappingURL=taskRoute.js.map