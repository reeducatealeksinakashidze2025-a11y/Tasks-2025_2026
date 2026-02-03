import * as zod from 'zod'

export const createExpenseSchema = zod.object({
    category: zod.coerce.number(),
    price: zod.coerce.number(),
    productName:zod.string(),
    quantity:zod.coerce.number()
})

export type CreateExpenseType = zod.infer<typeof createExpenseSchema>