import type { ColumnDef } from '@tanstack/vue-table'

export interface Image {
  url: string
  name: string
  label: string
  contributor: string
}

export const imagesTableColumns: ColumnDef<Image>[] = [
  {
    accessorKey: 'file_path',
    header: 'الصورة',
    cell({ row }) {
      return <img width={70} height={70} src={row.original.url} />
    },
  },
  {
    accessorKey: 'name',
    header: 'اسم الملف',
  },
  {
    accessorKey: 'label',
    header: 'الكلمة',
  },
  {
    accessorKey: 'contributor',
    header: 'المساهم',
  },
]
