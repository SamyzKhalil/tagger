<script setup lang="ts">
import { cn } from '@/components/ui/utils'
</script>

<template>
  <h5 :class="cn('mb-2 font-medium leading-none tracking-tight', $attrs.class ?? '')">
    <slot />
  </h5>
</template>
