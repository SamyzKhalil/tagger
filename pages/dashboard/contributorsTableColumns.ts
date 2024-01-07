import type { ColumnDef } from '@tanstack/vue-table'

export interface Contributions {
  handle: string | null
  contributions: number | null
}

export const contributorsTableColumns: ColumnDef<Contributions>[] = [
  {
    accessorKey: 'handle',
    header: 'المُعرّف',
    size: 50,
  },
  {
    accessorKey: 'contributions',
    header: 'المساهمات',
    size: 50,
  },
]
