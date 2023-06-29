import z from 'zod'

const createUserValidation= z.object(
    {
        firstname: z.string().min(5).max(35),
        lastname: z.string().min(5).max(35),
        email: z.string().email(),
        age: z.number()
    }
)
export default createUserValidation