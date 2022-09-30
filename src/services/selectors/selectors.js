export const sumSelector = (state) => {
  let value = 0;
  state.menu.constructorItems.forEach((el) => {
    if (el.type === "bun") {
      value += el.price * 2;
    } else {
      value += el.price;
    }
  });
  return value;
};

export const constructorSelector = (state) => {
  const bun = state.menu.constructorItems.find((i) => i.type === "bun");
  const items = state.menu.constructorItems.filter((i) => i.type !== "bun");

  if (bun) {
    return [bun, ...items, bun];
  } else {
    return items;
  }
};

export const modalSelector = (state) => {
    
}