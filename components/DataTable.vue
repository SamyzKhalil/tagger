<script setup lang="ts" generic="TData, TValue">
import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
  type ColumnDef,
} from '@tanstack/vue-table'

const props = defineProps<{
  columns: ColumnDef<TData, TValue>[]
  data?: TData[] | null
  loading?: boolean
}>()

const table = useVueTable({
  get data() {
    return props.data ?? []
  },
  get columns() {
    return props.columns
  },
  getCoreRowModel: getCoreRowModel(),
})
</script>

<template>
  <Card
    v-bind="$attrs"
    class="relative overflow-auto"
    :class="{ 'overflow-hidden': props.loading }"
  >
    <!-- <ScrollArea class="h-full"> -->
    <Table>
      <TableHeader
        class="sticky top-0 bg-card after:absolute after:w-full after:border-b after:border-b-border"
      >
        <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
          <TableHead
            v-for="header in headerGroup.headers"
            :key="header.id"
            :style="{
              width:
                header.getSize() === Number.MAX_SAFE_INTEGER
                  ? 'auto'
                  : header.getSize() + '%',
            }"
          >
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
            <TableCell
              v-for="cell in row.getVisibleCells()"
              :key="cell.id"
              :style="{
                width:
                  cell.column.getSize() === Number.MAX_SAFE_INTEGER
                    ? 'auto'
                    : cell.column.getSize() + '%',
              }"
            >
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
              لا توجد بيانات
            </TableCell>
          </TableRow>
        </template>
      </TableBody>
    </Table>
    <!-- </ScrollArea> -->

    <Loading :show="props.loading" />
  </Card>
</template>
