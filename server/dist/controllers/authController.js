"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfile = exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../models/User"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const registerUser = async (req, res) => {
    const { name, username, password } = req.body;
    try {
        let user = await User_1.default.findOne({ username });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        user = new User_1.default({
            name,
            username,
            password: await bcryptjs_1.default.hash(password, 10),
        });
        await user.save();
        const token = (0, generateToken_1.default)(user.id);
        res.status(201).json({ token });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User_1.default.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = (0, generateToken_1.default)(user.id);
        res.json({ token });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.loginUser = loginUser;
const getUserProfile = async (req, res) => {
    const user = req.user;
    res.json(user);
};
exports.getUserProfile = getUserProfile;
