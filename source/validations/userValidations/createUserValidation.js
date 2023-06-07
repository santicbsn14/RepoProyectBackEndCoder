import z from 'zod'

const createUserValidation= z.object(
    {
        firstName: z.string().min(5).max(35),
        lastName: z.string().min(5).max(35),
        email: z.string().email(),
        age: z.number()
    }
)
export default createUserValidation