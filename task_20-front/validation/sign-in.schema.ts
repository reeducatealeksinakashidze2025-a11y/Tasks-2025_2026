import * as zod from 'zod'

export const signInSchema = zod.object({
    email: zod.email('შეიყვანეთ სწორი იმეილი'),
    password: zod.string().min(6, {message: 'მინიმალურია 6'}).max(20, {message: "მაქსიმალურია 20"})
})

export type SignInType = zod.infer<typeof signInSchema>