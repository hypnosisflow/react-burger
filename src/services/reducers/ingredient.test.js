import { ADD_DETAILS, REMOVE_DETAILS } from "../constants/menu";
import { ingredientReducer, initialState } from "./ingredientReducer";

describe("Ingredient reducer", () => {
  test("initial state", () => {
    expect(ingredientReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle ADD_DETAILS", () => {
    let ingredient = "Ingredient added";
    expect(
      ingredientReducer(undefined, {
        type: ADD_DETAILS,
        payload: ingredient,
      })
    ).toEqual({
      ...initialState,
      item: ingredient,
      modalOpen: true,
    });
  });

  it("should handle REMOVE_DETAILS", () => {
    expect(
      ingredientReducer(undefined, {
        type: REMOVE_DETAILS,
      })
    ).toEqual({
      ...initialState,
    });
  });
});
