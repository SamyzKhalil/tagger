<script setup lang="ts">
import type { ToggleEmits, ToggleProps } from 'radix-vue'
import { Toggle, useForwardPropsEmits } from 'radix-vue'
import type { VariantProps } from 'class-variance-authority'
import { computed } from 'vue'
import { toggleVariants } from '.'
import { cn } from '@/components/ui/utils'

interface ToggleVariantProps extends VariantProps<typeof toggleVariants> {}

interface Props extends ToggleProps {
  color?: ToggleVariantProps['color']
  variant?: ToggleVariantProps['variant']
  size?: ToggleVariantProps['size']
  disabled?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  color: 'default',
  variant: 'default',
  size: 'default',
  disabled: false,
})
const emits = defineEmits<ToggleEmits>()

const toggleProps = computed(() => {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const { variant, size, disabled, ...otherProps } = props
  return otherProps
})

const forwarded = useForwardPropsEmits(toggleProps, emits)
</script>

<template>
  <Toggle
    v-bind="forwarded"
    :class="cn(toggleVariants({ variant, color, size, class: $attrs.class ?? '' }))"
    :disabled="props.disabled"
  >
    <slot />
  </Toggle>
</template>
