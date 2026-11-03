import jwt from 'jsonwebtoken';


//funcion que genera el token
export const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

//funcion que verifica el token
export const verifyToken = (token) => {
    try{
        return jwt.verify(token, process.env.JWT_SECRET);

    }
    catch (error) {
        throw new Error('Token invalido o expirado');
    }
};