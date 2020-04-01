import express from 'express';

export interface IUser {
    _id?: any;
    name?: string;
    email: string;
    password: string;
    date?: string;
}

export interface ICreateUserRequest extends IUser {}

export interface ILoginRequest {
    email: string;
    password: string;
}

export interface myReq extends express.Request {
user: IUser
}
