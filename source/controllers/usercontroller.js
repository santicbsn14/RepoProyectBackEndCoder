import userManager from "../Manager/userManager.js"
import { createHash } from "../utils/index.js";

export const getall = async (req,res)=>{
    try{
        const manager = new userManager()
        const { limit, sort } = req.query;
        const data = await manager.getall({ limit: parseInt(limit), sort });
    res.send(data)
}catch(error){
    console.log(error)
    res.status(404).send({error: error.message})
}
}
export const getonebyId =  async (req,res, next)=>{
    try{
    const manager = new userManager()
    let uid = req.params.uid
    res.status(200).json(await manager.getuserById(uid))
}catch(error){
    next(error)
}
}
export const save = async (req,res)=>{
    try{
        const manager = new userManager()
    let user = {...req.body, password: createHash(req.body.password, 10)}
    res.status(201).json(await manager.create(user))
    }catch(error){
        res.status(404).send(error)
    }
}
export const update = async (req,res)=>{
    try{
        const manager = new userManager()
    let uid = req.params.uid;
    let obj = req.body
    res.status(201).json(await manager.updateuser(uid, obj))
    }catch(error){
       res.status(404).send(error)
    }
}
export const deleteone = async (req,res)=>{
    try{
        const manager = new userManager()
    let uid = req.params.uid;
    res.status(201).json(await manager.deleteuser(uid))
    }catch(error){
       res.status(404).send(error)

}}