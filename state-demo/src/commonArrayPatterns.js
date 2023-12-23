// 상태 배열 업데이트에 대한 공통 패턴
const shoppingCart = [
  { id: 1, product: "HDMI Cable", price: 4 },
  { id: 2, product: "Easy Bake Oven", price: 28 },
  { id: 3, product: "Peach Pie", price: 6.5 },
];

// 배열에 항목 추가
[...shoppingCart, { id: 4, product: "Coffee Mug", price: 7.99 }];

// 요소 제거

shoppingCart.filter((item) => item.id !== 2);

// 배열의 모든 요소 업데이트

shoppingCart.map((item) => {
  return {
    ...item,
    product: item.product.toLowerCase(),
  };
});

// 특정 요소 수정

shoppingCart.map((item) => {
  if (item.id === 3) {
    return { ...item, price: 10.99 };
  } else {
    return item;
  }
});
