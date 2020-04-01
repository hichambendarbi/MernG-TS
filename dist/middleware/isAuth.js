"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.isAuth = (req, res) => {
    const token = req.header('x-auth-token');
    // Check if not token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    // Verify token
    try {
        const decoded = jsonwebtoken_1.default.verify(token, "hicham");
        const { user, iat, exp } = req.params;
        res.status(200);
        return res.json({ data: decoded });
    }
    catch (err) {
        res.status(403);
        return res.json({ err });
    }
};
