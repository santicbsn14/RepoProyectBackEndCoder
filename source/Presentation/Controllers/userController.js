import userManager from "../../Domain/Manager/userManager.js"
import { createHash } from "../../Shared/index.js";

export const getall = async (req,res, next)=>
{
    try
    {
        const manager = new userManager()
        const { limit, page } = req.query;
        const data = await manager.getall({ limit, page });
        res.send({ status: 'success', users: data.docs, ...data, docs: undefined })
    }
    catch(error)
    {
    next(error)
    }
}


export const getOneById =  async (req,res, next)=>
{
    try
    {
    const manager = new userManager()
    let uid = req.params.uid
    res.status(200).json(await manager.getUserById(uid))
    }
    catch(error)
    {
    next(error)
    }
}


export const save = async (req,res)=>
{
    try
    {
    const manager = new userManager()
    let user = {...req.body, password: await createHash(req.body.password, 10)}
    
    res.status(201).json(await manager.create(user))
    }
    catch(error)
    {
        next(error)
    }
}


export const update = async (req,res, next)=>
{
    try
    {
    const manager = new userManager()
    let uid = req.params.uid;
    let obj = req.body
    res.status(201).json(await manager.updateUser(uid, obj))
    }
    catch(error)
    {
       next(error)
    }
}


export const deleteOne = async (req,res)=>
{
    try
    {
    const manager = new userManager()
    let uid = req.params.uid;
    res.status(201).json(await manager.deleteUser(uid))
    }
    catch(error)
    {
       next(error)
    }
}