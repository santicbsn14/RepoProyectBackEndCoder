import productManager from "../../Domain/Manager/productManager.js"

export const getall = async (req,res)=>{
    try{
        const manager = new productManager()
        const { limit, page } = req.query;
        const data = await manager.paginate({ limit, page });
        res.send({ status: 'success', products: data.docs, ...data, docs: undefined })
}catch(error){
    res.status(404).json({error: error.message})
}
}
export const getOne =  async (req,res)=>{
    try{
    const manager = new productManager()
    let pid = req.params.pid
    res.status(200).send(await manager.getProductById(pid))
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
export const deleteOne = async (req,res)=>{
    try{
        const manager = new productManager()
    let pid = req.params.pid;
    res.status(201).json(await manager.deleteProduct(pid))
    }catch(error){
       res.status(404).send(error)

}}