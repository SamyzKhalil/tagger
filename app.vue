<script setup lang="ts">
import { ConfigProvider } from 'radix-vue'

useHead({
  titleTemplate: titleChunk => {
    return titleChunk ? `${titleChunk} | وسّام` : 'وسّام'
  },
  htmlAttrs: {
    dir: 'rtl',
  },
})
</script>

<template>
  <ConfigProvider dir="rtl">
    <div class="relative h-screen">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </ConfigProvider>
</template>
