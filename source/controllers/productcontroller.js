import productManager from "../Manager/ProductManager.js"

export const getall = async (req,res)=>{
    try{
        const manager = new productManager()
        const { limit, sort } = req.query;
        const data = await manager.getall({ limit: parseInt(limit), sort });
    res.send(data)
}catch(error){
    res.status(404).send(error)
}
}
export const getone =  async (req,res)=>{
    try{
    const manager = new productManager()
    let pid = req.params.pid
    console.log(pid)
    res.status(200).json(await manager.getproductbyid(pid))
}catch(error){
    res.status(404).send(error)
}
}
export const save = async (req,res)=>{
    try{
        const manager = new productManager()
    let product = req.body
    res.status(201).json(await manager.create(product))
    }catch(error){
        res.status(404).send(error)
    }
}
export const update = async (req,res)=>{
    try{
        const manager = new productManager()
    let pid = req.params.pid;
    let obj = req.body
    res.status(201).json(await manager.updateProduct(pid, obj))
    }catch(error){
       res.status(404).send(error)
    }
}
export const deleteone = async (req,res)=>{
    try{
        const manager = new productManager()
    let pid = req.params.pid;
    res.status(201).json(await manager.deleteproduct(pid))
    }catch(error){
       res.status(404).send(error)

}}