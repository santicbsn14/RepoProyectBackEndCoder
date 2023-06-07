import z from 'zod'
import idValidation from "../idValidations.js"
import createUserValidation from './createUserValidation.js'
const updateUserValidation= z.union(
    [
        idValidation,
        createUserValidation
    ]
)
export default updateUserValidation