
//eliminar un item del carrito
export const deleteItemCart = async (req, res) => {
    try{
        const {productId} = req.params;
        const cart = await Cart.findOne({ usuario: req.user._id });
        if (!cart) {
            return res.status(404).json({ ok:false, message: "Carrito no encontrado" });
        }
        cart.items = cart.items.filter(item => item.product.toString() !== productId);
        cart.calcularTotal();
        await cart.save();

        const cartPopulate = await cart.populate("items.product");

        return res.status(200).json({
             ok:true,
             cartPopulate
        });
    }
    catch (error) {
        return res.status(500).json({ 
            ok:false, 
            error: error.message
         });
    }
};