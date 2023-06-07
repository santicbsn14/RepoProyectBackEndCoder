import jwt from 'jsonwebtoken'
const auth = async (req,res, next)=>
{
    try {
        const token = req.headers.authorization
        
        if(!token){
            return res.status(401).send({message:'Empty authentication header'})
        }

         jwt.verify(token, process.env.PRIVATE_KEY,(error, credentials)=>{
            if(error) res.status(403).send({error:'error de autorizacion'})

            req.user= credentials.user
            next()
         })
    } catch (error) {
        console.log(error)
    }

}
export default auth