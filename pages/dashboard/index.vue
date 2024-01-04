<script setup lang="ts">
import { imagesTableColumns } from './imagesTableColumns'
import { contributorsTableColumns } from './contributorsTableColumns'

definePageMeta({
  middleware: 'admin',
})

useHead({
  title: 'لوحة التحكم',
})

const IMAGE_PAGE_SIZE = 100

const route = useRoute('dashboard')
const page = (route.query.page as unknown as number) || 1

const { data, pending } = await useAsyncData('dashboard', () => {
  return Promise.all([dbGetStats(), dbGetUsers(), dbGetImages(page, IMAGE_PAGE_SIZE)])
})

const [stats, users, initialImages] = data.value ?? []

const images = ref(initialImages)

const isLoading = ref(false)
let ac: AbortController

const { currentPage, pageCount, currentPageSize, isFirstPage, isLastPage, next, prev } =
  useOffsetPagination({
    page,
    pageSize: IMAGE_PAGE_SIZE,
    total: stats?.images || 0,
    onPageChange: async state => {
      if (ac) ac.abort()
      ac = new AbortController()

      isLoading.value = true
      const data = await dbGetImages(
        state.currentPage,
        state.currentPageSize,
        ac.signal,
      )

      if (data) {
        isLoading.value = false
        images.value = data

        const pageQuery = state.currentPage === 1 ? '' : `?page=${state.currentPage}`
        navigateTo('/dashboard' + pageQuery)
      }
    },
  })
</script>

<template>
  <div class="flex h-screen w-screen gap-4 p-4">
    <div class="flex w-2/5 min-w-[300px] flex-col space-y-4">
      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
        <TagCard
          icon="tabler:tag"
          title="الكلمات"
          :value="stats?.words"
          :of="stats?.images"
        />
        <TagCard icon="tabler:users" title="المساهمون" :value="stats?.contributors" />
      </div>

      <DataTable :columns="contributorsTableColumns" :data="users" />
    </div>

    <div class="flex w-full flex-col gap-4">
      <div class="flex justify-between" v-if="false">
        <div class="flex w-5/12 gap-2">
          <Input placeholder="بحث..." />
          <Toggle variant="outline" color="destructive">
            مباشر
            <Icon name="tabler:point-filled" class="ms-2 w-[16px]" />
          </Toggle>
        </div>

        <Button variant="secondary">
          رفع صور
          <Icon name="tabler:upload" class="ms-2 w-[16px]" />
        </Button>
      </div>

      <DataTable
        class="h-full"
        :columns="imagesTableColumns"
        :data="images"
        :loading="isLoading"
      />

      <div class="flex justify-between">
        <div class="flex items-center gap-2 ps-4">
          صفحة
          <div class="w-16">
            <Input
              min="1"
              :max="pageCount"
              type="number"
              class="appearance-textfield"
              v-model="currentPage"
            />
          </div>
          من {{ pageCount }} - {{ currentPageSize }} صورة
        </div>

        <div class="flex space-x-2 rtl:space-x-reverse">
          <Button variant="outline" :disabled="isFirstPage" @click="prev">
            السابق
          </Button>
          <Button variant="outline" :disabled="isLastPage" @click="next">التالى</Button>
        </div>
      </div>
    </div>
  </div>
</template>
