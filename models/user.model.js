import mongoose, { model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },

    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    }, 

    phone : {
        type : String,
    },

    profession : {
        type : String,
        required : true,
    }



} , {timestamps : true})


userSchema.methods.comparePassword = async function(password) {
    return bcrypt.compare(password , this.password);
}   

userSchema.pre('save' , async function(next) {
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password , 10);
    }
    next();
})  

userSchema.methods.generateToken = async function(){
    return jwt.sign({_id : this._id ,  email : this.email} , process.env.JWT_SECRET , {expiresIn : '1d'});    
}

export const User = new model('User' , userSchema);