import type { Database } from '~/types/database'

export async function useLabelDb(id: string) {
  const supabase = useSupabaseClient<Database>()

  const label = ref(
    (await supabase.from('labels').select('label').eq('image_id', id).single()).data
      ?.label || '',
  )

  watchDebounced(
    label,
    async label => {
      await supabase
        .from('labels')
        .upsert({ image_id: id, label }, { onConflict: 'image_id' })
    },
    { debounce: 1000 },
  )

  return { label }
}
