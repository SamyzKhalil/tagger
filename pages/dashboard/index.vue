<script setup lang="ts">
import { imagesTableColumns } from './imagesTableColumns'
import { contributorsTableColumns } from './contributorsTableColumns'

definePageMeta({
  middleware: 'admin',
})

const { contributors } = await useContributorsDb()
const { images } = await useImagesDb()
</script>

<template>
  <div class="flex h-screen w-screen gap-4 p-4">
    <div class="flex w-2/5 min-w-[300px] flex-col space-y-4">
      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
        <TagCard icon="tabler:tag" title="الكلمات" value="3729" of="15430" />
        <TagCard icon="tabler:users" title="المساهمون" value="91" />
      </div>

      <DataTable :columns="contributorsTableColumns" :data="contributors" />
    </div>

    <div class="flex w-full flex-col gap-4">
      <div class="flex justify-between">
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
        :data="[...images, ...images, ...images]"
        pagination
      />
    </div>
  </div>
</template>
