export function dbGetUsers() {
  const supabase = useSupabase()

  return supabase
    .from('users')
    .select()
    .then(({ data }) => data)
}

export function useUser() {
  const supabase = useSupabaseUser()

  const handle = computed<string>(() => supabase.value?.user_metadata.handle)
  const isAdmin = computed<boolean>(() => supabase.value?.app_metadata.is_admin)

  return {
    handle,
    isAdmin,
  }
}
