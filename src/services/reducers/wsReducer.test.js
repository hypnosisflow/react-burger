import { initialState, wsReducer } from "./wsReducer";
import {
  WebsocketStatus,
  wsClose,
  wsConnecting,
  wsError,
  wsMessage,
  wsOpen,
} from "./../actions/wsActions";

describe("Ws Reducer", () => {
  test("initial state", () => {
    expect(wsReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle wsConnecting", () => {
    expect(wsReducer(initialState, wsConnecting)).toEqual({
      ...initialState,
      status: WebsocketStatus.CONNECTING,
    });
  });

  it("should handle wsOpen", () => {
    expect(wsReducer(initialState, wsOpen)).toEqual({
      ...initialState,
      status: WebsocketStatus.ONLINE,
    });
  });

  it("should handle wsClose", () => {
    expect(wsReducer(initialState, wsClose)).toEqual({
      ...initialState,
      status: WebsocketStatus.OFFLINE,
    });
  });

  it("should handle wsError", () => {
    const errorMessage = "Error wsReducer";

    expect(wsReducer(initialState, wsError(errorMessage))).toEqual({
      ...initialState,
      connectionError: errorMessage,
    });
  });

  it("should handle wsMessage", () => {
    const message = {
      total: 0,
      totalToday: 0,
      orders: [],
    };
    expect(wsReducer(initialState, wsMessage(message))).toEqual({
      ...initialState,
      orders: message.orders,
      totalToday: message.totalToday,
      total: message.total,
    });
  });
});
