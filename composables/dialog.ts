type DialogProps = { id: string; word: string }
export const useWordDialog = createGlobalState(() => {
  const open = ref(false)
  const props = ref<DialogProps>({ id: '', word: '' })

  return { open, props }
})
