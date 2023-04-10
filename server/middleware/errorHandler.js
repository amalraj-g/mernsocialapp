import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import auth from '../middleware/auth.js';

const errorHandler = async(err, req, res, next)=> {
    try{
        const token = req.header.authorization;
        jwt.verify(token,process.env.SECRET);
        if (!token){ 
            throw new err;
        } else{
            auth();
        }
        next();

    }
        
    catch(err){   
        res.send(err);
    }
}; 
    

export default errorHandler;

