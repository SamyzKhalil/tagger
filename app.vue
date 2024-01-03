<script setup lang="ts">
import { ConfigProvider } from 'radix-vue'
import { SpeedInsights } from '@vercel/speed-insights/nuxt'

useHead({
  titleTemplate: titleChunk => {
    return titleChunk ? `وسّام | ${titleChunk}` : 'وسّام'
  },
  htmlAttrs: {
    dir: 'rtl',
  },
})
</script>

<template>
  <SpeedInsights />

  <ConfigProvider dir="rtl">
    <div class="relative h-screen">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </ConfigProvider>
</template>
