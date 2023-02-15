import {
  ORDER_FAILED,
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_RESET,
  ORDER_ADD_DETAILS,
  ORDER_HISTORY_REQUEST,
  ORDER_HISTORY_SUCCESS,
  ORDER_HISTORY_FAILED,
} from "../constants/order";
import { orderReducer, initialState } from "./orderReducer";

describe("Order reducer", () => {
  test("initial state", () => {
    expect(orderReducer(undefined, {})).toEqual({
      orderNumber: 0,
      orderHistoryNumber: 0,
      orderFailed: false,
      orderRequest: false,
      orders: null,
    });
  });

  it("should handle ORDER_REQUEST", () => {
    expect(
      orderReducer(undefined, {
        type: ORDER_REQUEST,
      })
    ).toEqual({
      orderNumber: 0,
      orderRequest: true,
      orderFailed: false,
      orders: null,
      orderHistoryNumber: 0,
    });
  });

  it("should handle ORDER_SUCCESS", () => {
    let orderSuccess = "Order recevied";
    expect(
      orderReducer(undefined, {
        type: ORDER_SUCCESS,
        payload: orderSuccess,
      })
    ).toEqual({
      orders: null,
      orderNumber: orderSuccess,
      orderRequest: false,
      orderFailed: false,
      orderHistoryNumber: 0,
    });
  });

  it("should handle ORDER_FAILED", () => {
    expect(
      orderReducer(undefined, {
        type: ORDER_FAILED,
      })
    ).toEqual({
      orderNumber: 0,
      orderRequest: false,
      orderFailed: true,
      orders: null,
      orderHistoryNumber: 0,
    });
  });

  it("should handle ORDER_RESET", () => {
    expect(
      orderReducer(undefined, {
        type: ORDER_RESET,
      })
    ).toEqual({
      ...initialState,
    });
  });

  it("should handle ORDER_ADD_DETAILS", () => {
    let orderNumber = 999;
    expect(
      orderReducer(undefined, {
        type: ORDER_ADD_DETAILS,
        payload: orderNumber,
      })
    ).toEqual({
      ...initialState,
      orderHistoryNumber: orderNumber,
    });
  });

  it("should handle ORDER_HISTORY_REQUEST", () => {
    expect(
      orderReducer(undefined, {
        type: ORDER_HISTORY_REQUEST,
      })
    ).toEqual({
      ...initialState,
    });
  });

  it("should handle ORDER_HISTORY_SUCCESS", () => {
    let ordersMock = "Orders recieved";
    expect(
      orderReducer(undefined, {
        type: ORDER_HISTORY_SUCCESS,
        payload: ordersMock,
      })
    ).toEqual({
      ...initialState,
      orders: ordersMock,
    });
  });

  it("should handle ORDER_HISTORY_FAILED", () => {
    expect(
      orderReducer(undefined, {
        type: ORDER_HISTORY_FAILED,
      })
    ).toEqual({
      ...initialState,
    });
  });
});
