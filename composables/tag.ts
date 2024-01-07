export async function dbAutoSaveTag(imageId: string) {
  const supabase = useSupabase()

  const word = ref()

  const { data } = await supabase
    .from('tags')
    .select('word')
    .eq('image_id', imageId)
    .single()

  if (data) {
    word.value = data.word
  }

  watchDebounced(
    word,
    async word => {
      await dbSaveTag(imageId, word)
    },
    { debounce: 1000 },
  )

  return { word }
}

export async function dbSaveTag(imageId: string, word: string) {
  const supabase = useSupabase()

  if (!word.trim()) {
    await supabase.from('tags').delete().eq('image_id', imageId)
    return
  }

  await supabase
    .from('tags')
    .upsert({ image_id: imageId, word }, { onConflict: 'image_id' })
}
