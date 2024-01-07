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
import { DialogRoot } from 'radix-vue'

export interface Image {
  id: string
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

      return <img width={100} height={50} src={url} key={row.original.file_name!} />
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
  {
    id: 'action',
    cell({ row }) {
      let word = row.original.word || ''

      async function save() {
        await dbSaveTag(row.original.id, word)
      }

      return (
        <Dialog>
          {/* <DialogTrigger as-child>
            <Button variant="ghost">تعديل كلمة</Button>
          </DialogTrigger> */}

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Icon name="tabler:dots-vertical" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DialogTrigger asChild>
                <DropdownMenuItem>
                  <Icon name="tabler:pencil" size="16" class="me-1" />
                  تعديل الكلمة
                </DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>

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
    },
  },
]
