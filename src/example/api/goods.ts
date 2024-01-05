import { cloneDeep } from "lodash"

const fakerData = [{
  id: 1,
  name: '茶派',
  cate: '饮料',
  price: 5.00,
}, {
  id: 2,
  name: '东方树叶',
  cate: '饮料',
  price: 5.00,
}, {
  id: 3,
  name: '维他命水',
  cate: '饮料',
  price: 5.00,
}, {
  id: 4,
  name: '可乐',
  cate: '饮料',
  price: 3.00,
}, {
  id: 5,
  name: '雪碧',
  cate: '饮料',
  price: 3.00,
}, {
  id: 6,
  name: '冰红茶',
  cate: '饮料',
  price: 3.00,
}, {
  id: 7,
  name: '宝矿力水特',
  cate: '饮料',
  price: 5.00,
}, {
  id: 8,
  name: '矿泉水',
  cate: '饮料',
  price: 2.00,
}, {
  id: 9,
  name: '小鱼干',
  cate: '零食',
  price: 1.50,
}, {
  id: 10,
  name: '瓜子',
  cate: '零食',
  price: 12.00,
}, {
  id: 11,
  name: '花生',
  cate: '零食',
  price: 6.00,
}, {
  id: 12,
  name: '水果干',
  cate: '零食',
  price: 5.00,
}, {
  id: 13,
  name: '辣条',
  cate: '零食',
  price: 3.50,
}, {
  id: 14,
  name: '豆干',
  cate: '零食',
  price: 2.00,
}, {
  id: 15,
  name: '苹果',
  cate: '水果',
  price: 5.00,
}, {
  id: 16,
  name: '葡萄',
  cate: '水果',
  price: 5.00,
}, {
  id: 17,
  name: '橘子',
  cate: '水果',
  price: 7.20,
}, {
  id: 18,
  name: '梨',
  cate: '水果',
  price: 8.00,
}, {
  id: 19,
  name: '草莓',
  cate: '水果',
  price: 12.00,
}, {
  id: 20,
  name: '樱桃',
  cate: '水果',
  price: 18.00,
}, {
  id: 21,
  name: '山竹',
  cate: '水果',
  price: 22.00,
}]

interface GoodsListQuery {
  page?: number,
  limit?: number,
}

/** 获取商品列表 */
export function getGoodsList(params: GoodsListQuery) {
  const page = Number(params.page) || 1
  const limit = Number(params.limit) || 5
  return Promise.resolve({
    list: cloneDeep(fakerData.slice((page-1)*limit, page*limit)),
    page,
    limit,
    total: fakerData.length
  })
}
