import { IUser } from './../../types/typeUser';
import bcrypt from "bcryptjs";
import {USER} from '../../models/User.model'
import jwt from "jsonwebtoken";
import express from "express";
import {ITokenPayload} from "../../types/token";
import {ICreateUserRequest, myReq} from "../../types/typeUser";
// import {ITokenPayload} from "../../types/token";


import { 
    ValidatorLoginInput,
    ValidatorRegisterInput
  } from "../../utils/validators";

class UserController {

    // Register User
    public createUser = async ({ userInput }: any ) => {

      const {name, email, date, password} = userInput;
            const { valid, errors } = ValidatorRegisterInput(
                name ,
                email,
                password
              );
              if (!valid) return errors;
              const Suser: any = await USER.findOne({ email });
              if (Suser) {
                throw new Error ("User already exists")
              }
              const userPassword = await bcrypt.hash(password, 15);
              
      const newUser = new USER({
        name ,
        email,
        date ,
        password: userPassword
    });
    const User: any = await newUser.save();
          
    const token = jwt.sign(
      {
        id: User.id
      },
      "hicham",
      { expiresIn: "24h" }
    );
    return {
      ...User._doc,
      id: User._id,
      token
    };
  }

  // Login user
          public login = async ( { email, password }: any) => {

            const { errors } = ValidatorLoginInput(email, password);
        
            const user: any = await USER.findOne({ email });
        
            if (!user) {
              errors.general = "User not found";
              throw new Error ("User not found");
            }
        
            const match = await bcrypt.compare(password, user.password);
        
            if (!match) {
              errors.general = "Wrong credentials";
              throw new Error ("Password incorrect")
            }
        
            const token = jwt.sign(
              {
                id: user.id,
                username: user.username,
                email: user.email
              },
              "hicham",
              { expiresIn: "1d" }
            );
        
            return {
              ...user._doc,
              id: user._id,
              token
            };
          }
 
          // Verify Token
          public isAuth = (req: myReq, res: express.Response , next: express.NextFunction)=> {
            const token = req.header('x-auth-token');

            // Check if not token
            if(!token) {
                return res.status(401).json({ msg: 'No token, authorization denied' });
            }

            // Verify token
            try {
                const decoded : ITokenPayload  = jwt.verify(token, "hicham") as any;
               req.user._id = decoded.user
               console.log(req.user._id )
                next()
            } catch (err) {
              res.status(403)
              return res.json({err})
            }
            };

            // Get all users
            public getUsers = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
              const users: any []= await  USER.find()
                    if (users.length<0) {
                        return res.status(401).json({ msg: 'No Users exists' });
                    }
                    return users;
                    }

                    // Get user byID
                    public getUserByID = async (req: myReq, res: express.Response) => {
                     const user = await USER.findById(req.user._id).select('-password');
                     if(!user) {
                        throw new Error("Related user details are not found")
                     }
                     return res.json(user)
                    }
}
export const userController = new UserController();