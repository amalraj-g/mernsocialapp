import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/users.js';
import { ok, notFound, badRequest, serverError } from '../constants/values.js'; 

export const userSignIn = async (req, res) => {
    const { email, password } = req.body;

    try{
       
        const existingUser = await User.findOne({ email});
        if(!existingUser) return res.status(notFound).json({ message: 'User doesnot exist'}) ;
        
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect)return res.status(badRequest).json({ message: 'Invalid credential'});
            
        const token = jwt.sign({email:existingUser.email, id: existingUser._id} ,process.env.SECRET, {expiresIn:'1hr'});
        res.status(ok).json({ token});

    } catch(error){
        res.status(serverError).json({message:'somethng went wrong'});

    }

};

export const userSignUp = async  (req, res) => {
    const{email, password, confirmPassword, firstName, lastName} = req.body;
    try{
        const existingUser = await User.findOne({ email});
        if(existingUser) return res.status(badRequest).json({ message: 'User doesnot exist'}) ;

        if(password !== confirmPassword) return res.status(badRequest).json({ message: 'passwords do not match'}) ;
        const hashedPassword = await bcrypt.hash(password,12);
        const result =await User.create({email, password: hashedPassword,name:`${firstName}  ${lastName}`});

        res.status(ok).json({ result});
    }catch(error) {
        res.status(serverError).json({message:'somethng went wrong'});

    }

};