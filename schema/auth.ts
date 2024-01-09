import {
  type Output,
  object,
  string,
  minLength,
  maxLength,
  excludes,
  regex,
} from 'valibot'

export const formSchema = object({
  handle: string('هذا الحقل مطلوب', [
    minLength(3, 'يجب ألا يقل المُعرّف عن 3 رموز'),
    maxLength(32, 'يجب ألا يزيد المُعرّف عن 32 رمزاً'),
    excludes(' ', 'يجب ألا يحتوى المُعرّف على مسافات'),
    regex(/\w+/, 'يجب أن يحتوى المُعرّف على أحرف إنجليزية وأرقام فقط'),
  ]),
  password: string('هذا الحقل مطلوب', [
    minLength(6, 'يجب ألا تقل كلمة المرور عن 6 رموز'),
    maxLength(72, 'يجب ألا تزيد كلمة المرور عن 72 رمزاً'),
  ]),
})

export type FormSchema = Output<typeof formSchema>
