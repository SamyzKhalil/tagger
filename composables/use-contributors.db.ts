import type { Database } from '~/types/database'

export async function useContributorsDb() {
  const supabase = useSupabaseClient<Database>()

  const contributors = ref((await supabase.rpc('get_contributions')).data || [])

  return { contributors }
}
