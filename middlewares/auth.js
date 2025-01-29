import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
const auth = (req, res, next) =>{
    const token = req.headers.authorization;
    if(!token){
        res.status(401).json({message:'acesso negado'});
    }
    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET);
        req.id_usuario = decoded.id;
        next();
    } catch (error) {
        return res.status(400).json({message:'token invalido'});
    }
    
}

export default auth;