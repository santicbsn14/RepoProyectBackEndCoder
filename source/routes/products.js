import {Router} from 'express';
import ProductManager from '../Manager/ProductManager.js';

const productManager = new ProductManager()
const productsRouter = Router()


productsRouter.get('/', async (req,res)=>{
    try{
    let {limit} = req.query
    const data = await productManager.getProducts()
    let result = limit ? data.slice(0, limit): data
    res.send(result)
}catch(error){
    res.status(404).send(error)
}
})
productsRouter.get('/:pid', async (req,res)=>{
    try{
    let pid = +req.params.pid
    res.status(200).json(await productManager.getProductbyid(pid))
}catch(error){
    res.status(404).send(error)
}
})
productsRouter.post(`/`,async (req,res)=>{
    try{
    let product = req.body
    res.status(201).json(await productManager.addproduct(product))
    }catch(error){
        res.status(404).send(error)
    }
})
productsRouter.put(`/:pid`,async (req,res)=>{
    try{
    let pid = +req.params.pid;
    let obj = req.body
    res.status(201).json(await productManager.updateProduct(pid, obj))
    }catch(error){
       res.status(404).send(error)
    }
})
productsRouter.delete(`/:pid`,async (req,res)=>{
    try{
    let pid = +req.params.pid;
    res.status(201).json(await productManager.deleteProduct(pid))
    }catch(error){
       res.status(404).send(error)
    }
})



export default productsRouter;
