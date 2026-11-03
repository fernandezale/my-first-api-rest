import {Router} from 'express';
import { MercadoPagoConfig, Preference, Payment } from 'mercadoPago';

const router = Router();

const cliente = new MercadoPagoConfig({
    access_token: process.env.MERCADOPAGO_ACCESS_TOKEN
});

router.post('/create_preference', async (req, res) => {
    try {
        //completar la logica para crear la preferencia de pago
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error al crear la preferencia de pago',
            error: error.message
        });
    }
});

router.post('/webhook', async (req, res) => {
    try {
        const {type, data} = req.body;

        const topic = type || req.query.topic || req.query.type;
        const paymentId = data?.id || req.query["data.id"] || req.query.id;

    }
    catch (error) {
    }

});

//repuestas redireccionadas
router.get('/exito', (req, res) => {
    const {payment_id, status, external_reference, merchant_order_id} = req.query;
    console.log(`Pago exitoso: payment_id=${payment_id}, status=${status}, external_reference=${external_reference}, merchant_order_id=${merchant_order_id}`);

    return res.send(`<h1>Pago exitoso, Gracias por tu compra!</h1><p>Tu pago =<strong>${payment_id}</strong></p><p>Estado= ${status}</p><p>external_reference=${external_reference}</p><p>merchant_order_id=${merchant_order_id}</p>`);
});