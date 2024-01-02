import type { Database } from '~/types/database'

export default defineNuxtRouteMiddleware(async (to, _from) => {
  const supabase = useSupabaseClient<Database>()

  const { data: image } = await supabase.rpc('view_image').single()

  if (image) {
    return navigateTo(`/label/${image.id}/${image.name}`, { replace: true })
  }
})
