const authorization = (permission) =>
{
    return async(req, res, next) =>
    {
        const user = req.user;
        
        if (!user._doc.isAdmin && !user._doc.role?.permissions?.includes(permission))
        {
            return res.status(401).send({ message: 'Not authorization!' });
        }

        next();
    }
}

export default authorization;