"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatorRegisterInput = (name, email, password
// confirmPassword: string
) => {
    const errors = {};
    if (name.trim() === "") {
        errors.name = "name must not be empty";
    }
    if (email.trim() === "") {
        errors.email = "email must not be empty";
    }
    else {
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if (!email.match(regEx)) {
            errors.email = "email must be a valid address";
        }
    }
    if (password === "") {
        errors.password = "Password must not be empty";
    }
    // @ts-ignore
    return { errors, valid: Object.keys(errors) < 1 };
};
exports.ValidatorLoginInput = (username, password) => {
    const errors = {};
    if (username.trim() === "") {
        errors.username = "Username must not be empty";
    }
    if (password.trim() === "") {
        errors.password = "Password must not be empty";
    }
    // @ts-ignore
    return { errors, valid: Object.keys(errors) < 1 };
};
