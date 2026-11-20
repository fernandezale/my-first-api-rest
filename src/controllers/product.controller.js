import { request, response} from "express";
import Product from "../models/products.js";

export const getProducts = async (req = request, res = response) => {
    try {
    //paginacion
    const { limit = 5, from = 0 } = req.query;
    const { total, products } = await Promise.all([
        Product.countDocuments({ estado: true }),
        Product.find({ estado: true })
            .skip(Number(from))
            .limit(Number(limit))
            .populate("usuario", "username email role")
            .populate("categoria", "nombre"),
    ]);

    res.json({
        total,
        products,
    });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: "Error al obtener los productos",
        });
    }

}

//create product
export const createProduct = async (req = request, res = response) => {
    try{
        const { precio, categoria, descripcion, img } = req.body;
        const { nombre } = req.body.toUpperCase();

        //validar si existe el producto con ese nombre
        const productDB = await Product.findOne({ nombre });
        if (productDB) {
            return res.status(400).json({
                ok: false,
                msg: `El producto ${productDB.nombre} ya existe`,
            });
        }
        const data = {
            nombre,
            categoria,
            precio,
            descripcion,
            img,
            usuario: req.user._id, //valido autenticate (token)
        };
        const product = new Product(data);

        await product.save();

        res.status(201).json({
            ok: true,
            msg: `Producto ${product.nombre} creado correctamente`,
        });
    }catch(error){

    }
       
    
    
}
//update product

//delete product