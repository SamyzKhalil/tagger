import { type Output, object, string, minLength, maxLength } from 'valibot'

export const formSchema = object({
  handle: string('هذا الحقل مطلوب', [
    minLength(3, 'يجب ألا يقل المُعرّف عن 3 رموز'),
    maxLength(16, 'يجب ألا يزيد المُعرّف عن 16 رمزاً'),
  ]),
  password: string('هذا الحقل مطلوب', [
    minLength(6, 'يجب ألا تقل كلمة المرور عن 6 رموز'),
    maxLength(72, 'يجب ألا تزيد كلمة المرور عن 72 رمزاً'),
  ]),
})

export type FormSchema = Output<typeof formSchema>
