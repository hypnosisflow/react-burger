export const hasBun = (state) => {
  const bun = state.cart.bun;
  function isEmptyObject(obj) {
    return JSON.stringify(obj) !== "{}";
  }
  const hasBunInCart = isEmptyObject(bun);
  return hasBunInCart
}

export const sumSelector = (state) => {

  let value = 0;
  let bunValue = 0;
  let total = 0;

  if (hasBun) {
    bunValue += state.cart.bun.price * 2;
  }

  state.cart.items.forEach((el) => {
    value += el.price;
  });

  return (total += bunValue + value || 0);
};


export const constructorSelector = (state) => {
  const items = state.cart.items.filter((i) => i.type !== "bun");
  return items;
};

//
export const countSelector = (state) => {
  const ingredients = state.cart.items;
  const bun = state.cart.bun;

  let res = new Map();

  ingredients.reduce(
    (acc, e) => acc.set(e._id, (acc.get(e._id) || 0) + 1),
    res
  );
  if (hasBun) {
    res.set(bun._id, 2);
  }

  return res;
};
