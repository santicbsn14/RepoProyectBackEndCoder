
import cartManager from '../../Domain/Manager/cartManager.js'
export const newCart = async (req,res, next)=>
{
    try
    {
        const manager = new cartManager()
        let data = req.body
        res.status(201).json(await manager.create(data))
    }
    catch(error)
    {
        next(error)
    }
}

export const finalyBuy = async (req,res, next)=>
{
    try 
    {
        let cid = req.params.cid
        const  manager = new cartManager()
        
        let transInfoTicket = {code:'abcee342', purchaseDatetime: new Date(), amount:null, purchaser:{...req.user }}
        res.status(200).json(await manager.finalyBuy(cid, transInfoTicket))
    } 
    catch (error) 
    {
        next(error)
    }
}

export const getall = async (req,res, next)=>
{
    try 
    {
        const manager = new cartManager()
        const { limit, page } = req.query;

        res.status(201).json(await manager.getall({ limit, page }))
    } 
    catch (error) 
    {
        next(error)

    }
}

export const addProductByCart = async (req,res, next)=>
{
    try 
    {
        const manager = new cartManager()
        let cid = req.params.cid
        let pid = req.params.pid
        let qp = req.query
        res.status(201).json(await manager.addProductByCart(cid,pid,qp))
    } 
    catch (error) 
    {
        next(error)
    }
}

export const getProductsByCartId = async (req,res, next)=>
{
    try 
    {
        const manager = new cartManager()
        let cid = req.params.cid
        let pid = req.params.pid
        res.status(201).json(await manager.getCartById(cid, pid))
    } 
    catch (error) 
    {
        next(error)
    }
}

export const updateCart = async (req,res, next)=>
{
    try 
    {
        const manager = new cartManager()
        let cid = req.params.cid
        let cart = req.body
        res.status(201).json(await manager.updateCart(cid,cart))
    } 
    catch (error) 
    {
        next(error)
    }
}


export const deleteCart = async (req,res,next)=>
{
    try 
    {
        const manager = new cartManager()
        let cid = req.params.cid
        res.status(201).json(await manager.deleteCart(cid))
    } 
    catch (error) 
    {
        next(error)
    }
}

export const deleteProductByCart = async (req,res, next)=>
{
    try 
    {
        let pid = req.params.pid;

        let cid = req.params.cid;

        const manager = new cartManager();

        res.status(201).send(await manager.deleteProductByCart(cid,pid))
    } 
    catch (error) 
    {
        next(error)
    }
}