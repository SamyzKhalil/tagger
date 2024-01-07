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
      return <WordDialog id={row.original.id!} _word={row.original.word || ''} />
    },
  },
]

function WordDialog(props: { id: string; _word: string }) {
  let word = props._word

  async function save() {
    await dbSaveTag(props.id, word)
  }

  return (
    <Dialog>
      <DialogTrigger as-child>
        <Button variant="ghost">
          <Icon name="tabler:pencil" size="16" class="me-1" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader class="mb-2">
          <DialogTitle>تعديل الكلمة</DialogTitle>
        </DialogHeader>

        <div class="flex gap-4">
          <Input
            /* @ts-ignore */
            id="word"
            class=""
            modelValue={word}
            onUpdate:modelValue={value => (word = value as string)}
            placeholder="لا توجد كلمة"
          />
          {/* @ts-ignore */}
          <Button type="submit" onClick={save}>
            حفظ
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
