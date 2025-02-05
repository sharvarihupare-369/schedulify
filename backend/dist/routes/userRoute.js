"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controllers/UserController");
const authentication_1 = __importDefault(require("../middleware/authentication"));
const router = express_1.default.Router();
router.post("/register", UserController_1.registerUser);
router.post("/login", UserController_1.loginUser);
router.get("/logout", authentication_1.default, UserController_1.logoutUser);
exports.default = router;
//# sourceMappingURL=userRoute.js.map