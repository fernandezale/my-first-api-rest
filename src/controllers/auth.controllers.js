import User from "../models/User.js"

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json({
            ok: true,
            msg: 'Todo bien',
            users,
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error al obtener usuarios',
            error: error.message,
        });
    }
};
