import type { ColumnDef } from '@tanstack/vue-table'

export interface Contributions {
  handle: string | null
  contributions: number | null
}

export const contributorsTableColumns: ColumnDef<Contributions>[] = [
  {
    accessorKey: 'handle',
    header: 'المُعرّف',
  },
  {
    accessorKey: 'contributions',
    header: 'المساهمات',
  },
]
