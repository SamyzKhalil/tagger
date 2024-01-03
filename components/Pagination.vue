<script setup lang="ts">
const { prev, next, isFirstPage } = useOffsetPagination({
  onPageChange()
})
</script>

<template>
  <div class="flex justify-end space-x-2 rtl:space-x-reverse">
    <Button variant="outline" :disabled="" @click=""> السابق </Button>
    <Button variant="outline" :disabled="" @click=""> التالى </Button>
  </div>
</template>
