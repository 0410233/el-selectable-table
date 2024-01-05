
<template>
  <div class="container">
    <el-selectable-table
      :data="records"
      :initial-selection="selection"
      identity="id"
      style="width: 100%;"
    >
      <el-table-column label="ID" prop="id"></el-table-column>
      <el-table-column label="商品名" prop="name"></el-table-column>
      <el-table-column label="价格" prop="price"></el-table-column>
      <el-table-column label="分类" prop="cate"></el-table-column>
    </el-selectable-table>
    <div class="pagination">
      <el-pagination
        small
        background
        layout="prev, pager, next"
        v-model:current-page="pagination.page"
        :page-size="pagination.limit"
        :total="pagination.total"
        @current-change="onPageChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElTableColumn, ElPagination } from 'element-plus'
import ElSelectableTable from '../components/ElSelectableTable.vue'
import { reactive, ref } from 'vue';
import { getGoodsList } from './api/goods'

const pagination = reactive({
  page: 1,
  limit: 5,
  total: 0,
})

interface Goods {
  id: number,
  name: string,
  cate: string,
  price: number,
}
const records = ref([] as Goods[])

async function getGoods(page?: number) {
  if (page && Number(page) > 0) {
    pagination.page = Number(page)
  }
  const res = await getGoodsList(pagination)
  records.value = res.list
  pagination.total = res.total
}
getGoods(1)

const selection = ref([] as Goods[])

function onPageChange(page: number) {
  getGoods(page)
}
</script>

<style scoped>
.container {
  width: 100%;
  max-width: 1200px;
}

.container {
  width: 100%;
}

.pagination {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 20px;
}
</style>
