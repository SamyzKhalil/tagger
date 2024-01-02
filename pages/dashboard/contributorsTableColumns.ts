import type { ColumnDef } from '@tanstack/vue-table'

export interface Contributions {
  username: string
  contributions: number
}

export const contributorsTableColumns: ColumnDef<Contributions>[] = [
  {
    accessorKey: 'username',
    header: 'اسم المستخدم',
  },
  {
    accessorKey: 'contributions',
    header: 'المساهمات',
  },
]
