export function dbGetUsers() {
  const supabase = useSupabase()

  return supabase
    .from('users')
    .select()
    .then(({ data }) => data)
}
