
import cartManager from '../Manager/cartmanager2.js'
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
        res.status(404).send(error)
    }
}
export const addproductbycart = async (req,res)=>{
    try {
        const manager = new cartManager()
        let cid = req.params.cid
        let pid = req.params.pid
        let qp = req.query
        res.status(201).json(await manager.addproductbycart(cid,pid,qp))
    } catch (error) {
        console.log(error)
    }}
export const getproductsbycartid = async (req,res)=>{
    try {
        const manager = new cartManager()
        let cid = req.params.cid
        let pid = req.params.pid
        res.status(201).json(await manager.getcartbyid(cid, pid))
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
export const deletecart = async (req,res)=>{
    try {
        const manager = new cartManager()
        let cid = req.params.cid
        res.status(201).json(await manager.deletecart(cid))
    } catch (error) {
        console.log(error)
    }
}

