<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()

function signOut() {
  supabase.auth.signOut().then(() => {
    navigateTo('/login')
  })
}
</script>

<template>
  <div
    v-if="user"
    class="top-0 mx-auto flex h-24 w-full max-w-screen-lg items-center justify-between gap-8"
  >
    <div class="flex items-center gap-4">
      <span>
        {{ user?.user_metadata.username }}
      </span>

      <Button v-if="user.app_metadata.role_admin" variant="outline" as-child>
        <NuxtLink to="/dashboard">لوحة التحكم</NuxtLink>
      </Button>
    </div>
    <Button @click="signOut()" variant="link">تسجيل خروج</Button>
  </div>
</template>
