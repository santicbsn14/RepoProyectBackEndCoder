
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
        res.status(201).json(await manager.getall())
    } catch (error) {
        res.status(404).send(error)
    }
}
export const addproductbycart = async (req,res)=>{
    try {
        const manager = new cartManager()
        let cid = req.params.cid
        let newproduct = req.body
        res.status(201).json(await manager.addproductbycart(cid,newproduct))
    } catch (error) {
        console.log(error)
    }}
export const getproductsbycartid = async (req,res)=>{
    try {
        const manager = new cartManager()
        let cid = req.params.cid
        res.status(201).json(await manager.getcartbyid(cid))
    } catch (error) {
        console.log(error)
    }}
export const deletecart = async (req,res)=>{
    try {
        const manager = new cartManager()
        let cid = +req.params.cid
        res.status(201).json(await manager.deletecart(cid))
    } catch (error) {
        console.log(error)
    }
}

