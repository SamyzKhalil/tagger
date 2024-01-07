<script setup lang="ts">
const supabase = useSupabaseClient()
const { handle, isAdmin } = useUser()

function signOut() {
  supabase.auth.signOut().then(() => {
    navigateTo('/login')
  })
}
</script>

<template>
  <div
    class="top-0 mx-auto flex h-24 w-full max-w-screen-lg items-center justify-between gap-8"
  >
    <div class="flex items-center gap-4">
      <span>{{ handle }}</span>

      <Button v-if="isAdmin" variant="outline" as-child>
        <NuxtLink to="/dashboard">لوحة التحكم</NuxtLink>
      </Button>
    </div>
    <Button @click="signOut()" variant="link">تسجيل خروج</Button>
  </div>
</template>
