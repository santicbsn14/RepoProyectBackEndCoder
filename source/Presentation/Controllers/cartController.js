
import cartManager from '../../Domain/Manager/cartManager.js'
export const newCart = async (req,res, next)=>{
    try{
        const manager = new cartManager()
    res.status(201).json(await manager.create())
    }catch(error){
        next(error)
    }
}
export const getall = async (req,res, next)=>{
    try {
        const manager = new cartManager()
        let { page, paginate} = req.query

        res.status(201).json(await manager.getall({page,paginate}))
    } catch (error) {
        next(error)

    }
}
export const addProductByCart = async (req,res, next)=>{
    try {
        const manager = new cartManager()
        let cid = req.params.cid
        let pid = req.params.pid
        let qp = req.query
        res.status(201).json(await manager.addProductByCart(cid,pid,qp))
    } catch (error) {
        next(error)
    }}
export const getProductsByCartId = async (req,res, next)=>{
    try {
        const manager = new cartManager()
        let cid = req.params.cid
        let pid = req.params.pid
        res.status(201).json(await manager.getCartById(cid, pid))
    } catch (error) {
        next(error)
    }
}
export const updateCart = async (req,res, next)=>{
    try {
        const manager = new cartManager()
        let cid = req.params.cid
        let cart = req.body
        res.status(201).json(await manager.updateCart(cid,cart))
    } catch (error) {
        next(error)
    }
}
export const updateProductCart = async (req,res, next)=>{
    try {
        const manager = new cartManager()
        let cid = req.params.cid
        let pid = req.params.pid
        let productQuantity = req.body
        res.status(201).json(await manager.updateCart(cid,pid,productQuantity))
    } catch (error) {
        next(error)
    }
}
export const deleteCart = async (req,res,next)=>{
    try {
        const manager = new cartManager()
        let cid = req.params.cid
        res.status(201).json(await manager.deleteCart(cid))
    } catch (error) {
        next(error)
    }
}

