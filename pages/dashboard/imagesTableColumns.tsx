import type { ColumnDef } from '@tanstack/vue-table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button,
  Input,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Icon,
  WordDialog,
} from '#components'

import { dbSaveTag } from '#imports'

export interface Image {
  id: string | null
  file_name: string | null
  word: string | null
  handle: string | null
  // is_locked: boolean;
}

export const imagesTableColumns: ColumnDef<Image>[] = [
  {
    accessorKey: 'file_name',
    header: 'الصورة',
    size: 20,
    cell({ row }) {
      const url = row.original.file_name ? getImageUrl(row.original.file_name) : ''

      return <img width={100} height={50} src={url} key={row.original.file_name!} />
    },
  },
  {
    accessorKey: 'file_name',
    header: 'اسم الملف',
    size: 25,
    cell({ row }) {
      return <span dir="auto">{row.original.file_name}</span>
    },
  },
  {
    accessorKey: 'word',
    header: 'الكلمة',
    size: 25,
  },
  {
    accessorKey: 'handle',
    header: 'المساهم',
    size: 20,
    cell({ row }) {
      return row.original.handle && <span dir="auto">@{row.original.handle}</span>
    },
  },
  {
    id: 'action',
    size: 10,
    cell({ row }) {
      const { open, props } = useWordDialog()

      return (
        <button
          onClick={() => {
            open.value = true

            props.value = {
              id: row.original.id!,
              word: row.original.word!,
            }
          }}
        >
          <Icon name="tabler:pencil" size="16" class="me-1" />
        </button>
      )
    },
  },
]
