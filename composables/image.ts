import type { PaginationState } from '@tanstack/vue-table'

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

export function dbGetImagesCount() {
  const supabase = useSupabase()

  return supabase
    .from('stats')
    .select('images')
    .single()
    .then(({ data }) => data?.images)
}

export async function useImages(page: number, perPage: number, total: number) {
  const supabase = useSupabase()

  const isLoading = ref(false)

  function getImages(
    state = {
      currentPage: page,
      currentPageSize: perPage,
    },
  ) {
    isLoading.value = true

    return supabase
      .from('images')
      .select()
      .range(
        (state.currentPage - 1) * state.currentPageSize,
        state.currentPage * state.currentPageSize - 1,
      )
      .order('word')
      .then(({ data }) => {
        isLoading.value = false

        return data
      })
  }

  const data = ref(await getImages())
  const cache = {
    [page]: data.value,
  }

  const pagination = useOffsetPagination({
    async onPageChange(state) {
      if (cache[state.currentPage]) {
        data.value = cache[state.currentPage]
      }

      data.value = await getImages(state)
      cache[state.currentPage] = data.value
    },
    total,
    page,
    pageSize: perPage,
  })

  const currentPageSize = computed(() => data.value?.length || 0)

  return {
    isLoading,
    images: data,
    ...pagination,
    currentPageSize,
  }
}

export function getImageUrl(file_name: string) {
  const supabase = useSupabase()

  return supabase.storage.from('dataset').getPublicUrl(file_name).data.publicUrl
}
