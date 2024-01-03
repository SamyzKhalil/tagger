<script setup lang="ts">
import { useForm } from 'vee-validate'
import { formSchema } from '@/schema/auth'
import { toTypedSchema } from '@vee-validate/valibot'

definePageMeta({
  layout: 'auth',
})

const form = useForm({
  validationSchema: toTypedSchema(formSchema),
})

const alert = ref<{ type: 'default' | 'destructive'; message: string } | null>()

const submitHandler = form.handleSubmit(async values => {
  alert.value = null

  const { success, message } = await dbSignUp(values)

  if (success) {
    alert.value = { type: 'default', message }
    return navigateTo('/')
  }

  alert.value = { type: 'destructive', message }
})
</script>

<template>
  <Card>
    <CardHeader>
      <Alert v-if="alert" :variant="alert.type">
        <Icon name="tabler:alert-circle" />
        <AlertTitle>{{ alert.type === 'default' ? 'نجاح' : 'خطأ' }}</AlertTitle>
        <AlertDescription>{{ alert.message }}</AlertDescription>
      </Alert>
    </CardHeader>

    <CardContent class="space-y-2">
      <form id="register" class="space-y-8" @submit="submitHandler">
        <FormField v-slot="{ componentField }" name="handle">
          <FormItem v-auto-animate>
            <FormLabel>المُعرّف</FormLabel>
            <FormControl>
              <Input type="text" placeholder="ادخل المُعرّف" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="password">
          <FormItem v-auto-animate>
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
