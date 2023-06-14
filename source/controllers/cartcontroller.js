
import cartManager from '../Manager/cartManager.js'
export const newCart = async (req,res)=>{
    try{
        const manager = new cartManager()
    res.status(201).json(await manager.create())
    }catch(error){
        res.status(404).send(error)
    }
}
export const getall = async (req,res)=>{
    try {
        const manager = new cartManager()
        let {name, page, paginate} = req.query

        res.status(201).json(await manager.getall({name,page,paginate}))
    } catch (error) {
        res.status(404).send({message: error.message})
        console.log(error)
    }
}
export const addProductByCart = async (req,res)=>{
    try {
        const manager = new cartManager()
        let cid = req.params.cid
        let pid = req.params.pid
        let qp = req.query
        res.status(201).json(await manager.addProductByCart(cid,pid,qp))
    } catch (error) {
        console.log(error)
    }}
export const getProductsByCartId = async (req,res)=>{
    try {
        const manager = new cartManager()
        let cid = req.params.cid
        let pid = req.params.pid
        res.status(201).json(await manager.getCartById(cid, pid))
    } catch (error) {
        console.log(error)
    }
}
export const updateCart = async (req,res)=>{
    try {
        const manager = new cartManager()
        let cid = req.params.cid
        let cart = req.body
        res.status(201).json(await manager.updateCart(cid,cart))
    } catch (error) {
        console.log(error)
    }
}
export const updateProductCart = async (req,res)=>{
    try {
        const manager = new cartManager()
        let cid = req.params.cid
        let pid = req.params.pid
        let productQuantity = req.body
        res.status(201).json(await manager.updateCart(cid,pid,productQuantity))
    } catch (error) {
        console.log(error)
    }
}
export const deleteCart = async (req,res)=>{
    try {
        const manager = new cartManager()
        let cid = req.params.cid
        res.status(201).json(await manager.deleteCart(cid))
    } catch (error) {
        console.log(error)
    }
}

