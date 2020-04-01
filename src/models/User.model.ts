import {Schema, model, Document} from 'mongoose';

interface IUserModel extends Document {
    email : UserEmail
    name : UserName
    date : UserDate
    password: UserPassword
}

const UserSchema : Schema = new Schema({

    email : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        required : true
    },
    password : {
        type : String,
        required : true
    }

})

export const USER =  model<IUserModel>("USER", UserSchema)