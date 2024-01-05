<script setup lang="ts">
import { imagesTableColumns } from './imagesTableColumns'
import { contributorsTableColumns } from './contributorsTableColumns'
import { useRouteQuery } from '@vueuse/router'

definePageMeta({
  middleware: 'admin',
})

useHead({
  title: 'لوحة التحكم',
})

const IMAGE_PAGE_SIZE = 100

const page = useRouteQuery('page', 1, { transform: Number })
const filterWord = useRouteQuery('word', '')
const filterWordDeb = refDebounced(filterWord, 1000)

syncRef(filterWord, filterWordDeb)

const [stats, users, images] = await Promise.all([
  useAsyncData('stats', async () => await dbGetStats()),
  useAsyncData('users', async () => await dbGetUsers()),
  useAsyncData(
    `images:${page.value}`,
    async () => await dbGetImages(page.value, IMAGE_PAGE_SIZE, filterWordDeb.value),
    {
      watch: [page, filterWordDeb],
    },
  ),
])

const statsData = stats.data
const usersData = users.data
const imagesData = images.data
const imagesCount = computed(() => images.data.value?.count || 0)

const { currentPage, pageCount, currentPageSize, isFirstPage, isLastPage, next, prev } =
  useOffsetPagination({
    page: page,
    pageSize: IMAGE_PAGE_SIZE,
    total: imagesCount,
  })

function refresh() {
  stats.refresh()
  users.refresh()
  images.refresh()
}

const stream = useIntervalFn(refresh, 5000, {
  immediate: false,
})

const isLive = ref(false)
watch(
  isLive,
  live => {
    live ? stream.resume() : stream.pause()
  },
  {
    immediate: true,
  },
)
</script>

<template>
  <div class="flex h-screen w-screen gap-4 p-4">
    <div class="flex w-2/5 min-w-[300px] flex-col space-y-4">
      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
        <TagCard
          icon="tabler:tag"
          title="الكلمات"
          :value="statsData?.words"
          :of="statsData?.images"
        />
        <TagCard
          icon="tabler:users"
          title="المساهمون"
          :value="statsData?.contributors"
        />
      </div>

      <DataTable
        :columns="contributorsTableColumns"
        :data="usersData"
        :loading="users.pending.value"
      />
    </div>

    <div class="flex w-full flex-col gap-4">
      <div class="flex justify-between">
        <div class="flex w-5/12 gap-2">
          <Input placeholder="بحث..." v-model:model-value="filterWordDeb" />
          <!-- <Toggle variant="outline" color="destructive" v-model:pressed="isLive">
            مباشر
            <Icon name="tabler:point-filled" class="ms-2 w-[16px]" />
          </Toggle> -->
          <Button variant="outline" @click="refresh">تحديث</Button>
        </div>

        <!-- <Button variant="secondary">
          رفع صور
          <Icon name="tabler:upload" class="ms-2 w-[16px]" />
        </Button> -->
      </div>

      <DataTable
        class="h-full"
        :columns="imagesTableColumns"
        :data="imagesData?.data"
        :loading="images.pending.value"
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
          <Button variant="outline" :disabled="isLastPage" @click="next">
            التالى
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
