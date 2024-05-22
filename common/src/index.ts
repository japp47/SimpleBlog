import z from 'zod'

export const signupinput = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().optional()
})

export type SignupInput = z.infer<typeof signupinput>

export const signininput = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})

export type SigninInput = z.infer<typeof signininput>

export const createBlogInput = z.object({
    title: z.string(),
    content: z.string(),
})

export type CreateBlogInput = z.infer<typeof createBlogInput>

export const updateBlogInput = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
});

export type UpdateBlogInput = z.infer<typeof updateBlogInput>;