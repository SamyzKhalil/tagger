export function dbGetStats() {
  const supabase = useSupabase()

  return supabase
    .from('stats')
    .select()
    .single()
    .then(({ data }) => data)
}
