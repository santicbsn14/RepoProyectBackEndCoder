const errorHandler = (error,req,res,next)=>
{
    if(error?.message.includes(`not found`))
    {
        console.log(error.stack)
        return res.status(404).json({message: error.message})
    }else if(error?.name.includes('ZodError'))
    {
        console.log(error.stack)
        return res.status(404).json({message: error.issues})
    }
    console.log(error.stack)
    res.status(500).json({message: 'Ocurrio un error'})
}
export default errorHandler