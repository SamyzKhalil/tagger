import type { Database } from '~/types/database'

export function useSupabase() {
  return useSupabaseClient<Database>()
}
