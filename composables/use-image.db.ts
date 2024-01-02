import type { Database } from '~/types/database'

export function useImageDb(id: string, name: string) {
  const supabase = useSupabaseClient<Database>()

  const imageUrl = supabase.storage.from('images').getPublicUrl(name).data.publicUrl

  function newImage() {
    navigateTo('/label')
  }

  onMounted(() => {
    useIntervalFn(
      async () => {
        await supabase
          .from('viewing')
          .upsert(
            { image_id: id, updated_at: new Date().toISOString() },
            { onConflict: 'image_id' },
          )
      },
      50 * 1000,
      { immediate: true, immediateCallback: true },
    )
  })

  onUnmounted(async () => {
    await supabase.from('viewing').delete().eq('image_id', id)
  })

  return { imageUrl, newImage }
}
