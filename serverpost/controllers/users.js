import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/users.js';

const ok=200;
const notFound = 404;
const badRequest = 400;
const serverError =500;

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try{
       
        const existingUser = await User.findOne({ email});
        if(!existingUser) return res.status(notFound).json({ message: 'User doesnot exist'}) ;
        
        const ISPASSWORDCORRECT = await bcrypt.compare(password, existingUser.password);
        if(!ISPASSWORDCORRECT)return res.status(badRequest).json({ message: 'Invalid credential'});
            
        const token = jwt.sign({email:existingUser.email, id: existingUser._id} ,'winner', {expiresIn:'1hr'});
        res.status(ok).json({ token});

    } catch(error){
        res.status(serverError).json({message:'somethng went wrong'});

    }

}

export const signup = async  (req, res) => {
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

}