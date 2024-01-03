export default defineNuxtRouteMiddleware((to, _from) => {
  const user = useSupabaseUser()

  if (user.value && !to.path.startsWith('/tag') && to.path !== '/dashboard') {
    return navigateTo('/tag')
  }
})
