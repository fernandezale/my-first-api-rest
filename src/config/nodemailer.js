import nodemailer from "nodemailer";

// Create a transporter using SMTP
// const transporter = nodemailer.createTransport({
//   host: "smtp.example.com",
//   port: 587,
//   secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
// });

export const createTransporter = () => {
    return nodemailer.createTransporter({
        host:" smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        }
    })
}

export const sendVerificationEmail = async (email, username, verificationCode) => {
    const transporter = createTransporter();
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Verifica tu mail en nuestra aplicacion',
        html: `
            <h1>Hola ${username} - Bienvenido a nuestro sitio</h1>
            <p>Gracias por registrarte en nuestra aplicacion. Tu codigo de verificacion es: </p>
            <h2 style="color: green; font-size: 32px; letter-spacing: 5px; margin: 20px 0;">${verificationCode}</h2>
            <p>Este codigo es valido por 15 minutos. Si no lo ingresas a tiempo, tendras que solicitar uno nuevo.</p>
            <p>Si no te registraste en nuestra aplicacion, ignora este mensaje.</p>`
    }
    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error al enviar email:', error);
    }
};