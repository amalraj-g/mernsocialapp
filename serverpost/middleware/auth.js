import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {  unAuthorized, serverError } from '../constants/values.js';
dotenv.config();

const auth = async ( req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
       
        if (token){ 
            jwt.verify(token, process.env.SECRET,(err,decoded)=>{
                if(err){
                    throw new Error('jsonWebTokenError');
                } else{
                    
                    req.userId = decoded?.id;
                    next();
                }
            });
        }
        else {
            let decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
                    
        }
    } catch (error) {
        if(error.message ==='jsonWebTokenError'){
            next({status:unAuthorized, message:'invalid token'});
        }else{
            next({status:serverError, message:'internal serverError generated'});
        }
        
    }

};
    
export default auth;