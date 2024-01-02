import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

export const loginSchema = toTypedSchema(
  z.object({
    email: z
      .string({ required_error: 'هذا الحقل مطلوب' })
      .email({ message: 'صيغة البريد الإلكترونى غير صحيحة' }),
    password: z
      .string({ required_error: 'هذا الحقل مطلوب' })
      .min(6, { message: 'يجب ألا يقل كلمة المرور عن 6 رموز' })
      .max(72, { message: 'يجب ألا يزيد كلمة المرور عن 72 رمزاً' }),
  }),
)

export const registerSchema = toTypedSchema(
  z.object({
    username: z
      .string({ required_error: 'هذا الحقل مطلوب' })
      .min(3, { message: 'يجب ألا يقل اسم المستخدم عن 3 رموز' })
      .max(16, { message: 'يجب ألا يزيد اسم المستخدم عن 16 رمزاً' }),
    email: z
      .string({ required_error: 'هذا الحقل مطلوب' })
      .email({ message: 'صيغة البريد الإلكترونى غير صحيحة' }),
    password: z
      .string({ required_error: 'هذا الحقل مطلوب' })
      .min(6, { message: 'يجب ألا يقل كلمة المرور عن 6 رموز' })
      .max(72, { message: 'يجب ألا يزيد كلمة المرور عن 72 رمزاً' }),
  }),
)
