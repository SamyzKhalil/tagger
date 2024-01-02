<template>
  <div class="flex h-full items-center justify-center">
    <div class="w-[500px] space-y-4">
      <SegmentList class="grid w-full grid-cols-2">
        <SegmentButton to="login" :data-state="$route.path === '/login' && 'active'">
          التسجيل
        </SegmentButton>
        <SegmentButton
          to="register"
          :data-state="$route.path === '/register' && 'active'"
        >
          حساب جديد
        </SegmentButton>
      </SegmentList>

      <slot />
    </div>
  </div>
</template>
