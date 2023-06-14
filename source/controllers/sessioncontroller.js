import userManager from "../Manager/userManager.js";
import {createHash, validPassword, generateToken} from '../Shared/index.js'
export const signup = async (req,res)=>
{
    try
    {
        const manager = new userManager()
        let user = {...req.body, password: await createHash(req.body.password, 10)}
        await manager.create(user)
        res.status(201).send({message:'Singup exitoso', user})
    } 
    catch (error)
    {
        throw new Error(error)
    }
}


export const login = async (req,res)=>
{
    try
    {
        const {email, password} = req.body
        
        if(!email && !password){
            throw new Error('Email and password invalid format ')
        }
        const manager = new userManager()
        const user = await manager.getUserByEmail(email)
        const isHashedPassword = await validPassword(password, user.password);
            if (!isHashedPassword) {
                throw new Error("Login failed, invalid password.");
            }

        const accesToken= await generateToken(user)
        return  res.status(201).send({accesToken, message: 'Login exited'}) 
    }
    catch (error)
    {
        throw new Error(error)
    }
}


export const current = async (req,res) =>{
    res.status(200).send({status:'succes', payload: req.user})
}







