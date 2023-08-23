import {z} from "zod"
export const registerValidation = z.object({
  email: z.string({required_error:'Email is required.'}).email('Invalid email.'),
  password: z.string().min(6,'Password is shorter of 6 s.'),
  second_password: z.string(),
  first_name: z.string().min(1,'First name is required.'),
  last_name: z.string().min(1,'Last name is required.'),
  country: z.string().min(1,'Country is required.'),
  phone: z.string().min(10,'Invalid phone'),
}).refine((data)=>data.password === data.second_password,{
  path:['second_password'],
  message:'Passwords are diff',
});

export const groupValidation = z.object({
  lable: z.string({required_error: "Group name is required."}).min(1,'Group name is required.'),
});


export const categoryValidation = z.object({
  lable: z.string({required_error:"Column name is required."})
})

export const taskValidation = z.object({
  title: z.string({required_error:"Title is required"}),
  description: z.string().optional(),
  importance: z.boolean().optional(),
});





