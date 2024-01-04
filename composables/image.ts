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

// export function dbGetImagesCount() {
//   const supabase = useSupabase()

//   return supabase
//     .from('stats')
//     .select('images')
//     .single()
//     .then(({ data }) => data?.images)
// }

export async function useImages(page: number, perPage: number) {
  const supabase = useSupabase()

  const isLoading = ref(false)

  function getImages(
    state = {
      currentPage: page,
      currentPageSize: perPage,
    },
  ) {
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

  const debouncedGetImage = useDebounceFn(getImages, 500)

  const images = ref(await debouncedGetImage())

  const pagination = useOffsetPagination({
    async onPageChange(state) {
      isLoading.value = true
      const data = await debouncedGetImage(state)

      if (data) {
        images.value = data
      }
    },
    page,
    pageSize: perPage,
    async onPageCountChange(state) {
      isLoading.value = true
      const data = await debouncedGetImage(state)

      if (data) {
        images.value = data
      }
    },
  })

  const currentPageSize = computed(() => images.value?.length || 0)

  return {
    isLoading,
    images,
    ...pagination,
    currentPageSize,
  }
}

export function dbGetImages(
  page: number,
  pageSize: number,
  abortSignal: AbortSignal = new AbortController().signal,
) {
  const supabase = useSupabase()

  return supabase
    .from('images')
    .select()
    .range((page - 1) * pageSize, page * pageSize - 1)
    .order('word')
    .abortSignal(abortSignal)
    .then(({ data }) => data)
}

export function getImageUrl(file_name: string) {
  const supabase = useSupabase()

  return supabase.storage.from('dataset').getPublicUrl(file_name).data.publicUrl
}
