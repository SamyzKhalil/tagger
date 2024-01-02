<script setup lang="ts">
import { useForm } from 'vee-validate'
import { registerSchema } from '@/schema/auth'

definePageMeta({
  layout: 'auth',
})

const form = useForm({
  validationSchema: registerSchema,
})

const successMessage = ref('')
const errorMessage = ref('')
const supabase = useSupabaseClient()

const submitHandler = form.handleSubmit(async values => {
  const { data, error } = await supabase.auth.signUp({
    email: values.email,
    password: values.password,

    options: {
      data: {
        username: values.username,
      },
    },
  })

  if (error?.status === 400) {
    errorMessage.value = 'هذا البريد الإلكترونى مُستخدَم بالفعل.'
  }

  successMessage.value = 'تم إنشاء حساب. فضلاً قم بتأكيد بريدك الإلكترونى.'
})
</script>

<template>
  <Card>
    <CardHeader>
      <Alert v-if="successMessage">
        <Icon name="tabler:circle-check" />
        <AlertTitle>نجاح</AlertTitle>
        <AlertDescription>{{ successMessage }}</AlertDescription>
      </Alert>

      <Alert v-if="errorMessage" variant="destructive">
        <Icon name="tabler:alert-circle" />
        <AlertTitle>خطأ</AlertTitle>
        <AlertDescription>{{ errorMessage }}</AlertDescription>
      </Alert>
    </CardHeader>

    <CardContent class="space-y-2">
      <form id="register" class="space-y-8" @submit="submitHandler">
        <FormField v-slot="{ componentField }" name="username">
          <FormItem>
            <FormLabel>اسم المستخدم</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="ادخل اسم المستخدم"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

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
      <Button form="register">إنشاء حساب</Button>
    </CardFooter>
  </Card>
</template>
