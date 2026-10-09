import Router from 'express';
import User from '../models/User.js';
const router = Router();

router.get('/', async (req, res) => {
    
    const users = await User.find()
    res.json({
        msg: 'Todo bien',
        users
    })
});

router.post("/", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email, password });

        //generar codigo de verificacion

        //guardar el usuario
        await user.save();

        //enviar el email de verificacion

        //mandar la respuesta
        return res.status(200).json({
            ok: true,
            msg: 'Usuario creado exitosamente!'
            
        });
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'Error creating user',
            error: error.message
        });
    }
});

export default router;