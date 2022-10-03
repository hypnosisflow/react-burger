export const sumSelector = (state) => {
  const bun = state.cart.bun;

  function isEmptyObject(obj) {
    return JSON.stringify(obj) !== "{}";
  }
  const hasBun = isEmptyObject(bun);

  let value = 0;
  let bunValue = 0;
  let total = 0;

  if (hasBun) {
    bunValue += state.cart.bun.price * 2;
  }

  state.cart.items.forEach((el) => {
    if (el.type === "bun") {
      value += el.price * 2;
    } else {
      value += el.price;
    }
  });
  return (total += bunValue + value);
};

export const constructorSelector = (state) => {
  const items = state.cart.items.filter((i) => i.type !== "bun");
  return items;
};

export const menuSelector = (state) => {
  const products = state.cart.items;

  let res = new Map();

  return products.reduce(
    (acc, e) => acc.set(e._id, (acc.get(e._id) || 0) + 1),
    res
  );
};
