"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.auth = (context) => {
    const authHeader = context.req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split("Bearer ")[1];
        if (token) {
            try {
                return jsonwebtoken_1.default.verify(token, "hicham");
            }
            catch (e) {
                throw new Error("Invalid/expired token");
            }
        }
        throw new Error("Authentication token must be provided");
    }
    throw new Error("Authorization header be provided");
};
