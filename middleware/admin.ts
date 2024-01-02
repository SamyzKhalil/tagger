export default defineNuxtRouteMiddleware((to, _from) => {
  const user = useSupabaseUser()

  if (!user.value?.app_metadata.role_admin) {
    return abortNavigation('Unauthorized')
  }
})
