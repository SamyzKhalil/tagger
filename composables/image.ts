export async function dbLockImage(id: string) {
  const supabase = useSupabase()

  await supabase
    .from('locked_images')
    .upsert({ id, locked_at: new Date().toISOString() })
}

export async function dbUnlockImage(id: string) {
  const supabase = useSupabase()

  await supabase.from('locked_images').delete().eq('id', id)
}

export function dbAutoLockImage(id: string, interval: number) {
  useIntervalFn(
    async () => {
      await dbLockImage(id)
    },
    interval,
    { immediate: true, immediateCallback: true },
  )

  onUnmounted(async () => {
    await dbUnlockImage(id)
  })
}

export async function dbAutoSaveLabel(imageId: string) {
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
      if (!word.trim()) {
        await supabase.from('tags').delete().eq('image_id', imageId)
        return
      }

      await supabase
        .from('tags')
        .upsert({ image_id: imageId, word }, { onConflict: 'image_id' })
    },
    { debounce: 1000 },
  )

  return { word }
}

export function dbGetUniqueImage() {
  const supabase = useSupabase()

  return supabase
    .from('images_random')
    .select()
    .is('is_locked', false)
    .is('word', null)
    .limit(1)
    .single()
    .then(({ data }) => data)
}

export function dbGetImages(page: number, pageSize: number, filterWord?: string) {
  const supabase = useSupabase()

  let query = supabase
    .from('images')
    .select('*', { count: 'planned' })
    .range((page - 1) * pageSize, page * pageSize - 1)
    .order('word')

  if (filterWord) query = query.filter('word', 'like', filterWord)

  return query.then(({ data, count }) => ({ data, count }))
}

export function getImageUrl(file_name: string) {
  const supabase = useSupabase()

  return supabase.storage.from('dataset').getPublicUrl(file_name).data.publicUrl
}
