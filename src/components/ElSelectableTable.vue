<template>
  <el-table class="selectable-table" ref="table"
    size="small"
    :data="data"
    v-loading="loading"
    stripe
    :border="true"
    @selection-change="onSelectionChange"
  >
    <el-table-column type="selection" width="55" align="center" :selectable="selectable"></el-table-column>
    <slot></slot>
  </el-table>
</template>

<script lang="ts" setup generic="RowType">
import { Ref, computed, nextTick, ref, watch } from "vue";
import { ElTable, ElTableColumn } from 'element-plus'
import { differenceBy, unionBy, cloneDeep } from 'lodash'

interface Props {
  /** 表格数据 */
  data: Array<RowType>,
  /** 初始选中 */
  initialSelection?: Array<RowType>,
  loading?: boolean,
  selectable?: ((row: RowType, index: number) => boolean),
  identity: string | ((row: RowType) => string|number),
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
  loading: false,
  identity: 'id',
})

const emit = defineEmits(['selection-change'])

const keyof = computed(() => {
  const id = props.identity
  if (typeof id === 'function') {
    return id
  }
  return (row: RowType) => {
    return String((row as any as {[prop: string]: unknown})[id])
  }
})

/** 表格组件实例引用 */
const table = ref(null as null|InstanceType<typeof ElTable>)

/** 所有已选项 */
const selected = ref(null) as Ref<Array<RowType> | null>

/** 差集 */
function diff(s1: Array<RowType>, s2: Array<RowType>) {
  if (!s1.length || !s2.length) {
    return s1.slice()
  }
  return differenceBy(s1, s2, keyof.value)
}

/** 并集 */
function union(s1: Array<RowType>, s2: Array<RowType>) {
  if (!s1.length) {
    return s2.slice()
  }
  if (!s2.length) {
    return s1.slice()
  }
  return unionBy(s1, s2, keyof.value)
}

// /** 交集 */
// function intersection(s1: Array<RowType>, s2: Array<RowType>) {
//   return intersectionBy(s1, s2, keyof.value)
// }

/** 初始化已选项 */
function initSelected() {
  selected.value = Array.isArray(props.initialSelection)
    ? props.initialSelection.slice()
    : [] as Array<RowType>
}

watch(() => props.initialSelection, () => {
  initSelected()
}, {immediate: true})

watch(() => props.data, () => {
  nextTick(() => {
    updateTableSelection()
  })
}, {immediate: true})

/** 更新选中状态 */
function updateTableSelection() {
  // console.log('updateTableSelection', clone({selected: this.selected}))
  if (selected.value === null) {
    initSelected()
  }
  const map = (selected.value as Array<any>).reduce((res, x) => {
    res[keyof.value(x)] = true
    return res
  }, {})
  if (table.value && props.data) {
    const elTable = table.value
    props.data.slice().forEach(row => {
      elTable.toggleRowSelection(row, !!map[keyof.value(row)])
    })
  }
}

let timer: NodeJS.Timeout | undefined = undefined

/** 选中项更新 */
function onSelectionChange(selection: Array<RowType>) {
  // console.log('onSelectionChange')
  if (selected.value === null) {
    initSelected()
  }
  clearTimeout(timer)
  timer = setTimeout(() => {
    // console.log('perform handle selection change', clone(selection))
    // 先排除当前未选择的
    const clean = diff((selected.value as RowType[]), diff(props.data || [], selection))
    selected.value = union(clean, selection)
    emit('selection-change', cloneDeep(selected.value))
  }, 150)
}
</script>
