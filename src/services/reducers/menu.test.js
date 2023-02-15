import { FETCH_FAILED, FETCH_REQUEST, FETCH_SUCCESS } from "../constants/menu";
import { initialState, menuReducer } from "./menuReducer";

describe("Menu reducer", () => {
  test("initial state", () => {
    expect(menuReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle FETCH_REQUEST", () => {
    expect(
      menuReducer(undefined, {
        type: FETCH_REQUEST,
      })
    ).toEqual({
      ...initialState,
      menuRequest: true,
      menuSuccess: false,
    });
  });

    // it(" should handle FETCH_SUCCESS", () => {
    //   let menuMock = ['Menu received']
    //   expect(
    //       menuReducer(undefined, {
    //           type: FETCH_SUCCESS,
    //           payload: menuMock
    //       })
    //   ).toEqual({
    //       ...initialState,
    //       menu: [...menuMock.map((i) => ({ item: i}))],
    //       menuRequest: false,
    //       menuFailed: false,
    //       menuSuccess: true,
    //   })
    // });

  it("should handle FETCH_FAILED", () => {
    expect(
      menuReducer(undefined, {
        type: FETCH_FAILED,
      })
    ).toEqual({
      ...initialState,
      menu: [],
      menuFailed: true,
      menuRequest: false,
      menuSuccess: false,
    });
  });
});
