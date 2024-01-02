<script setup lang="ts">
import { useForm } from 'vee-validate'
import { loginSchema } from '@/schema/auth'

definePageMeta({
  layout: 'auth',
})

useHead({ title: 'تسجيل الدخول' })

const form = useForm({
  validationSchema: loginSchema,
})

const errorMessage = ref('')
const supabase = useSupabaseClient()

const submitHandler = form.handleSubmit(async values => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: values.email,
    password: values.password,
  })

  if (error?.status === 400) {
    errorMessage.value = 'بيانات تسجيل الدخول غير صحيحة'
  }
})

const user = useSupabaseUser()

watch(user, () => {
  if (user.value) {
    return navigateTo('/')
  }
})
</script>

<template>
  <Card>
    <CardHeader>
      <Alert v-if="errorMessage" variant="destructive">
        <Icon name="tabler:alert-circle" />
        <AlertTitle>خطأ</AlertTitle>
        <AlertDescription>{{ errorMessage }}</AlertDescription>
      </Alert>
    </CardHeader>

    <CardContent class="space-y-2">
      <form id="login" class="space-y-8" @submit="submitHandler">
        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormLabel>البريد الإلكترونى</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="ادخل البريد الإلكترونى"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="password">
          <FormItem>
            <FormLabel>كلمة المرور</FormLabel>
            <FormControl>
              <Input
                type="password"
                placeholder="ادخل كلمة المرور"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </form>
    </CardContent>

    <CardFooter>
      <Button form="login">تسجيل</Button>
    </CardFooter>
  </Card>
</template>
