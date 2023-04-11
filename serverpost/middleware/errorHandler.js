import dotenv from 'dotenv';
dotenv.config();

const errorHandler = async(Error, req, res, next) => {
    res.status(Error.status);
    res.send({'error':true,'message':Error.message});
    next();
      
};
               
  


export default errorHandler;