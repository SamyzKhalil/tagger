<script setup lang="ts">
const props = defineProps<{ show: boolean }>()
</script>

<template>
  <Transition name="fade">
    <div
      v-if="props.show"
      class="absolute inset-0 flex items-center justify-center rounded-lg bg-background/85 backdrop-blur-md"
    >
      تحميل...
    </div>
  </Transition>
</template>
