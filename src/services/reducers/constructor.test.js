import {
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  REORDER_PRODUCTS,
  RESET,
} from "../constants/constructor";
import { initialState, constructorReducer } from "./constructorReducer";

describe("Constructor reducer", () => {
  test("initial state", () => {
    expect(constructorReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle ADD_PRODUCT", () => {
    const product = { type: "bun" };
    const allProducts = [product, product];

    expect(
      constructorReducer([], {
        type: ADD_PRODUCT,
        payload: product,
      })
    ).toEqual({
      bun: product,
    });
  });

  it("should handle REMOVE_PRODUCT", () => {
    const product = { type: "main", _id: 123 };
    const product2 = { type: "main", _id: 456 };
    const state = {
      bun: null,
      items: [product, product2],
    };

    expect(
      constructorReducer(state, {
        type: REMOVE_PRODUCT,
        payload: product._id,
      })
    ).toEqual({
      bun: null,
      items: [product2],
    });
  });

  it("should handle REODER_PRODUCTS", () => {
    const items = [1, 2, 3, 4];
    const state = {
      bun: null,
      items: items,
    };
    const testNumber = 1;

    expect(
      constructorReducer(state, {
        type: REORDER_PRODUCTS,
        payload: testNumber,
      })
    ).toEqual({
      ...initialState,
      items: state.items,
    });
  });

  it("should handle RESET", () => {
    expect(
      constructorReducer(undefined, {
        type: RESET,
      })
    ).toEqual({
      ...initialState,
    });
  });
});
