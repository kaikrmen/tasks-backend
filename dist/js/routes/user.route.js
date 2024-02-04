"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const router = (0, express_1.Router)();
router.get('/profile', user_controller_1.getProfile);
router.get('/login', user_controller_1.login);
exports.default = router;
