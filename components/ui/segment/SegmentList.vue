<script setup lang="ts">
import { cn } from '@/components/ui/utils'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <div
    v-bind="props"
    :class="
      cn(
        'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
