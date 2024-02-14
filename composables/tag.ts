export async function dbAutoSaveTag(imageId: string) {
  const supabase = useSupabase()

  const word = ref()
  const pending = ref(false)

  const { data } = await supabase
    .from('tags')
    .select('word')
    .eq('image_id', imageId)
    .single()

  if (data) {
    word.value = data.word
  }

  watch(word, () => {
    pending.value = true
  })

  watchDebounced(
    word,
    async word => {
      await dbSaveTag(imageId, word)
      pending.value = false
    },
    { debounce: 1000 },
  )

  return { word, pending }
}

export async function dbSaveTag(imageId: string, word: string) {
  const supabase = useSupabase()

  if (!word.trim()) {
    const { status } = await supabase.from('tags').delete().eq('image_id', imageId)
    return { status }
  }

  const { status } = await supabase
    .from('tags')
    .upsert({ image_id: imageId, word }, { onConflict: 'image_id' })

  return { status }
}

export function dbExportData() {
  const supabase = useSupabase()

  return supabase.from('tags').select('...images(file_name), word').csv()
}
