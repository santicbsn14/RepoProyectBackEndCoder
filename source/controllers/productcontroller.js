import productSchema from '../models/productSchema.js'

export const getall = async (req,res)=>{
    try{
    let {limit} = req.query
    const data = await productSchema.find()
    let result = limit ? data.slice(0, limit): data
    res.send(result)
}catch(error){
    res.status(404).send(error)
}
}
export const getone =  async (req,res)=>{
    try{
    let pid = +req.params.pid
    res.status(200).json(await productSchema.findOne({_id:pid}))
}catch(error){
    res.status(404).send(error)
}
}
export const save = async (req,res)=>{
    try{
    let product = req.body
    res.status(201).json(await productSchema.create(product))
    }catch(error){
        res.status(404).send(error)
    }
}
export const update = async (req,res)=>{
    try{
    let pid = +req.params.pid;
    let obj = req.body
    res.status(201).json(await productSchema.updateOne({_id:pid}, obj))
    }catch(error){
       res.status(404).send(error)
    }
}
export const deleteone = async (req,res)=>{
    try{
    let pid = +req.params.pid;
    res.status(201).json(await productSchema.deleteOne({_id:pid}))
    }catch(error){
       res.status(404).send(error)

}}