import * as zod from 'zod'

export const signUpSchema = zod.object({
    email: zod.email('შეიყვანეთ სწორი იმეილი'),
     phoneNumber: zod.string().min(9),
      gender: zod.coerce.number(),
      role: zod.coerce.string(),
    firstName: zod.string().min(2),
  lastName: zod.string().min(2),
    age: zod.coerce.number().min(15).max(90),
    password: zod.string().min(6, {message: 'მინიმალურია 6'}).max(20, {message: "მაქსიმალურია 20"})
})

export type SignUpType = zod.infer<typeof signUpSchema>