import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

const transport = nodemailer.createTransport({
    service:'gmail',
    port:587,
    auth:{
        user:process.env.EMAIL,
        pass:process.env.KEY_MAIL
    }
})

  
export const mailForGetPassword = (userEmail)=>{transport.sendMail({
    from:'Santiago Viale',
    to:userEmail,
    html:`<div>Ingresa <a href="http://127.0.0.1:5501/index.html">Aqui</a> para ingresar una nueva contraseña.</div>`,
    attachments:[]
})}