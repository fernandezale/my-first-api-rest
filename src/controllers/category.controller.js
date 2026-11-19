import Category from "../models/category.js";

//get (traer todas las categorias activas, el total y los datos del usuario que la creo)
export const getCategories = async (req, res) => {
    const categories = await Category.find({estado:true}).populate(
        "usuario",
        "email username role")
    const total = await Category.countDocuments({estado:true})

    return res.status(200).json({
        ok:true,
        total,
        categories
    })

}

//post
export const createCategory = async (req, res) => {
    try {
        const nombre = req.body.nombre.toUpperCase();
    const validarNombre = await Category.findOne({nombre});
    if(validarNombre){
        return res.status(400).json({
            ok:false,
            msg:`La categoria ${nombre} ya existe`
        })
    }
    const usuario = req.user._id;
    const category = new Category({nombre,usuario});
    await category.save();
    return res.status(201).json({
        ok:true,
        msg:"Categoria creada correctamente",
        category
    })
    }catch (error) {
        return res.status(500).json({
            ok:false,
            msg:"Error al crear la categoria"
        })
    }
}
//put
export const UpdateCategory = async (req, res) => {
    const {id} = req.params;
    const nombre = req.body.nombre.toUpperCase();

    const existeCategoria = await Category.findById(id);
    if(!existeCategoria){
        return res.status(404).json({
            ok:false,
            msg:`El id ${id} no existe`

        })
    }

    const validarNombre = await Category.findOne({nombre});
    if(validarNombre){
        return res.status(400).json({
            ok:false,
            msg:`Ya existe una categoria ${nombre}`
        })
    }

    if(!existeCategoria.estado){
        return res.status(400).json({
            ok:false,
            msg:`La categoria ${existeCategoria.nombre} esta desactivada`
        })
    }

    const datos = {
        nombre,
        usuario:req.user._id
    }

    const categoria = await Category.findByIdAndUpdate(id,datos,{returnDocument:"after"});

    res.status(200).json({
        ok:true,
        msg:"Categoria actualizada correctamente",
        categoria
    })
}
//delete
export const deleteCategory = async (req,res) => {
    const {id} = req.params;
    const existeCategoria = await Category.findById(id);

    if(!existeCategoria){
        return res.status(404).json({
            ok:false,
            msg:`El id ${id} no existe`
        })
    }

    //validar si la categoria esta activa
    if(!existeCategoria.estado){
        return res.status(400).json({
            ok:false,
            msg:`La categoria ${existeCategoria.nombre} ya esta desactivada`
        })
    }

    const categoriaBorrada = await Category.findByIdAndUpdate(id,{estado:false},{returnDocument:"after"});

    return res.status(200).json({
        ok:true,
        msg:`La categoria ${categoriaBorrada.nombre} fue desactivada correctamente`,
        categoriaBorrada
    })
};

