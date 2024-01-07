<script setup lang="ts">
import { onKeyPressed } from '@vueuse/core'

const { open, props } = useWordDialog()

async function save() {
  await dbSaveTag(props.value?.id, props.value?.word)
  open.value = false
}

onKeyPressed('Enter', () => {
  if (open.value) save()
})
</script>

<template>
  <Dialog :open="open" :modal="true">
    <DialogContent @interact-outside="open = false">
      <DialogHeader class="mb-2">
        <DialogTitle>تعديل الكلمة</DialogTitle>
      </DialogHeader>

      <div class="flex gap-4">
        <Input id="word" v-model:model-value="props.word" placeholder="لا توجد كلمة" />
        <Button type="submit" @click="save">حفظ</Button>
      </div>
    </DialogContent>
  </Dialog>
</template>
