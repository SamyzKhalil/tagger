<script setup lang="ts">
import { onKeyPressed } from '@vueuse/core'

const route = useRoute('tag-id-name')
const params = route.params

useHead({
  title: params.name,
})

dbAutoLockImage(params.id, 50 * 1000)
const { word, pending } = await dbAutoSaveTag(params.id)

const isLoading = ref(false)

function newImage() {
  if (isLoading.value) return

  isLoading.value = true
  navigateTo('/tag')
}

onKeyPressed('Enter', () => {
  newImage()
})

const imageUrl = getImageUrl(params.name)
</script>

<template>
  <Header />

  <div class="-mt-24 flex h-full items-center justify-center">
    <Card class="relative flex flex-col items-center">
      <CardHeader />

      <CardContent class="text-center">
        <img class="aspect-square w-[30vw] object-contain" :src="imageUrl" alt="" />
        <CardDescription class="mt-2" dir="auto">{{ params.name }}</CardDescription>
      </CardContent>

      <CardFooter>
        <div class="relative">
          <Input
            class="h-16 text-2xl"
            placeholder="لا توجد كلمة"
            v-lock-focus
            v-model="word"
          />

          <div class="absolute inset-y-0 left-4 flex items-center">
            <Icon name="tabler:refresh" class="animate-spin" v-if="pending" />
            <Icon name="tabler:circle-check-filled" v-else />
          </div>
        </div>
      </CardFooter>

      <div
        class="absolute inset-y-0 -right-[100px] mb-20 flex translate-x-full items-center"
      >
        <Button
          variant="ghost"
          @click="$router.back()"
          :disabled="!$router.options.history.state.back"
        >
          <Icon name="tabler:chevron-right" />
          السابق
        </Button>
      </div>

      <div
        class="absolute inset-y-0 -left-[100px] mb-20 flex -translate-x-full items-center"
      >
        <Button variant="default" @click="newImage()" :disabled="isLoading">
          صورة جديدة
          <Kbd class="ms-2">enter</Kbd>
          <Icon name="tabler:chevron-left" />
        </Button>
      </div>

      <Loading :show="isLoading" />
    </Card>
  </div>
</template>
