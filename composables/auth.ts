import type { FormSchema } from '~/schema/auth'

const EMAIL = '@tagger.app'

export async function dbSignIn(form: FormSchema) {
  const supabase = useSupabase()

  const { error } = await supabase.auth.signInWithPassword({
    email: form.handle + EMAIL,
    password: form.password,
  })

  if (!error) {
    return { success: true, message: '' }
  }

  let message = ''

  switch (error?.status) {
    case 400:
      message = 'بيانات تسجيل الدخول غير صحيحة'
      break
  }

  return { success: false, message }
}

export async function dbSignUp(form: FormSchema) {
  const supabase = useSupabase()

  const { error } = await supabase.auth.signUp({
    email: form.handle + EMAIL,
    password: form.password,
    options: {
      data: {
        handle: form.handle,
      },
    },
  })

  if (!error) {
    return { success: true, message: 'تم إنشاء الحساب' }
  }

  let message = ''

  switch (error?.status) {
    case 400:
      message = 'هذا المُعرّف مستخدم بالفعل'
      break
  }

  return { success: false, message }
}
