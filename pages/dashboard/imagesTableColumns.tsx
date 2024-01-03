import type { ColumnDef } from '@tanstack/vue-table'

export interface Image {
  // id: string;
  file_name: string | null
  word: string | null
  handle: string | null
  // is_locked: boolean;
}

export const imagesTableColumns: ColumnDef<Image>[] = [
  {
    accessorKey: 'file_name',
    header: 'الصورة',
    cell({ row }) {
      const url = row.original.file_name ? getImageUrl(row.original.file_name) : ''

      return <img width={100} height={50} src={url} />
    },
  },
  {
    accessorKey: 'file_name',
    header: 'اسم الملف',
    cell({ row }) {
      return <span dir="auto">{row.original.file_name}</span>
    },
  },
  {
    accessorKey: 'word',
    header: 'الكلمة',
  },
  {
    accessorKey: 'handle',
    header: 'المساهم',
    cell({ row }) {
      return row.original.handle && <span dir="auto">@{row.original.handle}</span>
    },
  },
]
