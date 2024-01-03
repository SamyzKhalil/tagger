<script setup lang="ts">
defineProps<{
  icon: string
  title: string
  value?: string | number | null
  of?: string | number | null
}>()
</script>

<template>
  <Card class="flex items-center">
    <span class="ms-6">
      <Icon :name="icon" />
    </span>

    <div>
      <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-0">
        <CardTitle class="text-base font-normal">{{ title }}</CardTitle>
      </CardHeader>
      <CardContent class="flex items-baseline">
        <div class="text-3xl font-bold">{{ value || '-' }}</div>
        <div v-if="of" class="text-lg text-muted-foreground">&nbsp;/ {{ of }}</div>
      </CardContent>
    </div>
  </Card>
</template>
