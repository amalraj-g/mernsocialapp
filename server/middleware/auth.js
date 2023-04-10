import jwt from 'jsonwebtoken';
import { unAuthorized } from '../constants/values.js';
import dotenv from 'dotenv';
dotenv.config();

const auth = async ( req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        let decodedData;                
        if (token){    
            decodedData= jwt.verify(token, process.env.SECRET) ;
            req.userId = decodedData?.id;
           
        }
        else {
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
                    
        } 
                    
        next();
    } catch (error) {
       
        res.status(unAuthorized).send(error.message) ;
    }
};
    

export default auth;