export default defineNuxtRouteMiddleware((to, _from) => {
  const user = useSupabaseUser()

  if (user.value && !to.path.startsWith('/label') && to.path !== '/dashboard') {
    return navigateTo('/label')
  }
})
