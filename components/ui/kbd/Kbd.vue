<script setup>
import { cn } from '@/components/ui/utils'
</script>

<template>
  <kbd
    :class="
      cn(
        'pointer-events-none inline-flex h-5 min-h-[20px] select-none items-center',
        'gap-1 rounded border border-border bg-primary px-1',
        'font-sans text-[11px] font-medium uppercase',
      )
    "
  >
    <slot />
  </kbd>
</template>
