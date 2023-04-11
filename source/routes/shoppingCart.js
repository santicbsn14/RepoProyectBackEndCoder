import ShoppingCartManager from "../Manager/CartManager.js";
import { Router } from "express";
 let cartRouter = Router()
let cart = new ShoppingCartManager()
cartRouter.post('/', async (req,res)=>{
    try{
    let products = req.body
    res.status(201).json(await cart.addCart(products))
    }catch(error){
        res.status(404).send(error)
    }
})
cartRouter.post('/:cid/product/:pid',async (req,res)=>{
    try {
        let cid = +req.params.cid
        let pid = +req.params.pid
        res.status(201).json(await cart.addProductbycartId(pid, cid))
    } catch (error) {
        console.log(error)
    }
})
cartRouter.get('/:cid',async (req,res)=>{
    try {
        let cid = +req.params.cid
        res.status(201).json(await cart.getProductsByCartId(cid))
    } catch (error) {
        console.log(error)
    }
})
export default cartRouter