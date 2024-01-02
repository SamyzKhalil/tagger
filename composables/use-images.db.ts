import type { Database } from '~/types/database'

export async function useImagesDb() {
  const supabase = useSupabaseClient<Database>()

  const { data } = await supabase.rpc('get_images')

  const imagesWithUrl = data!.map(v => ({
    ...v,
    url: supabase.storage.from('images').getPublicUrl(v.name).data.publicUrl,
  }))

  const images = ref(imagesWithUrl)

  return { images }
}
