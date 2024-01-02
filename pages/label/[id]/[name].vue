<script setup lang="ts">
import { onKeyPressed } from '@vueuse/core'

const route = useRoute('label-id-name')
const params = route.params

useHead({
  title: params.name,
})

const { imageUrl, newImage } = useImageDb(params.id, params.name)

onKeyPressed('Enter', () => {
  newImage()
})

const { label } = await useLabelDb(params.id)
</script>

<template>
  <Header />

  <div class="-mt-24 flex h-full items-center justify-center">
    <Card class="relative flex flex-col items-center">
      <CardHeader />

      <CardContent class="text-center">
        <img class="aspect-square w-[30vw] object-contain" :src="imageUrl" alt="" />
        <CardDescription class="mt-2">{{ params.name }}</CardDescription>
      </CardContent>

      <CardFooter>
        <Input
          class="h-16 text-2xl"
          placeholder="الكلمة"
          v-lock-focus
          v-model="label"
        />
      </CardFooter>

      <div
        class="absolute inset-y-0 -right-[100px] mb-20 flex translate-x-full items-center"
      >
        <Button variant="ghost" @click="$router.back()">
          <Icon name="tabler:chevron-right" />
          السابق
        </Button>
      </div>

      <div
        class="absolute inset-y-0 -left-[100px] mb-20 flex -translate-x-full items-center"
      >
        <Button variant="default" @click="newImage()">
          صورة جديدة
          <Kbd class="ms-2">enter</Kbd>
          <Icon name="tabler:chevron-left" />
        </Button>
      </div>
    </Card>
  </div>
</template>
