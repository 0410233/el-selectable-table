// 引入封装好的组件
import ElSelectableTable from "./components/ElSelectableTable.vue"

const install = function (Vue: any) {
  Vue.component('ElSelectableTable', ElSelectableTable);
}

export default install
