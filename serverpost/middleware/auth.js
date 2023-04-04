import jwt from 'jsonwebtoken';

const secret = 'winner';
const badRequest = 400;

const auth = async (req, res, next) => {
  try {
    const token = req.headers.Authorization.split(' ')[1];
    let decodedData;

    if (token) {      
      decodedData = jwt.verify(token, secret);

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }    

    next();
  } catch (error) {
    
    res.status(badRequest).send('bad token');
  }
};

export default auth;