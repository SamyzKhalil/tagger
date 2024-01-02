<script setup lang="ts" generic="TData, TValue">
import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
  getPaginationRowModel,
  type ColumnDef,
} from '@tanstack/vue-table'

const props = defineProps<{
  data: TData[]
  columns: ColumnDef<TData, TValue>[]
  pagination?: boolean
}>()

const table = useVueTable({
  get data() {
    return props.data
  },
  get columns() {
    return props.columns
  },
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: props.pagination ? getPaginationRowModel() : undefined,
})

defineExpose({ table })
</script>

<template>
  <Card v-bind="$attrs" class="overflow-hidden">
    <ScrollArea class="h-full">
      <Table>
        <TableHeader class="sticky top-0 z-50 bg-card">
          <TableRow
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
          >
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <TableRow
              v-for="row in table.getRowModel().rows"
              :key="row.id"
              :data-state="row.getIsSelected() ? 'selected' : undefined"
            >
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender
                  :render="cell.column.columnDef.cell"
                  :props="cell.getContext()"
                />
              </TableCell>
            </TableRow>
          </template>
          <template v-else>
            <TableRow>
              <TableCell :colSpan="columns.length" class="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </ScrollArea>
  </Card>

  <div v-if="pagination" class="flex justify-end space-x-2 rtl:space-x-reverse">
    <Button
      variant="outline"
      :disabled="!table?.getCanPreviousPage()"
      @click="table?.previousPage()"
    >
      السابق
    </Button>
    <Button
      variant="outline"
      :disabled="!table?.getCanNextPage()"
      @click="table?.nextPage()"
    >
      التالى
    </Button>
  </div>
</template>
