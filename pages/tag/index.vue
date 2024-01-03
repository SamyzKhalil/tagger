<script setup lang="ts">
definePageMeta({
  middleware: 'tag',
})

useHead({
  title: 'نفدت الصور',
})
</script>

<template>
  <div class="flex h-full flex-col items-center justify-center gap-4 text-3xl">
    <Icon name="tabler:photo-x" size="256" />
    نفدت الصور
  </div>
</template>
