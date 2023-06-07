import userManager from "../Manager/userManager.js";
import {createHash, validPassword, generateToken} from '../utils/index.js'
export const signup = async (req,res)=>{
    try {
        const {firstname, lastname, email, age, password} = req.body
        const manager = new userManager()
        const newuser = await manager.create({firstname, lastname, email, age, password} )
        res.status(201).send({message:'Singup exitoso', newuser})
    } catch (error) {
        console.log(error)
        res.status(401).send({message:'error'})
    }
}
export const login = async (req,res)=>{
    try {
        const {email, password} = req.body
        console.log(password)
        if(!email && !password){
            throw new Error('Email and password invalid format ')
        }
        const manager = new userManager()
        const user = await manager.getuserbyemail(email)
        console.log(user)
        if(user.password !== password ){
            return res.status(401).send({message:'Invalid password, failed login'})
        }
        req.session.user = {email}

        res.status(201).send({message: 'Login exited'})
    } catch (error) {
        console.log(error)
    }
}
export const login2 = async (req,res)=>{
    try {
        const {email, password} = req.body
        
        if(!email && !password){
            throw new Error('Email and password invalid format ')
        }
        const manager = new userManager()
        const user = await manager.getuserbyemail(email)
        if(user.password !== password ){
            return res.status(401).send({message:'Invalid password, failed login'})
        }
        const accesToken= await generateToken(user)
        return  res.status(201).send({accesToken, message: 'Login exited'}) 
    } catch (error) {
        console.log(error)
    }
}
export const current = async (req,res) =>{
    res.status(200).send({status:'succes', payload: req.user})
}