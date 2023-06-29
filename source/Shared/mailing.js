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
    html:`   <form id="wordForm">
    <label for="letter">Password</label>
    <input type="text" id="letter" />
    <button type="button">Descubrir</button>
  </form>>`,
    attachments:[]
})}