import { initialState, wsProfileReducer } from "./wsProfileReducer";
import {
  WebsocketStatus,
  wsClose,
  wsConnecting,
  wsError,
  wsMessage,
  wsOpen,
} from "./../actions/wsProfileActions";

describe("Ws Reducer", () => {
  test("initial state", () => {
    expect(wsProfileReducer(undefined, {})).toEqual(initialState);
  });


  it("should handle wsConnecting", () => {
    expect(wsProfileReducer(initialState, wsConnecting)).toEqual({
      ...initialState,
      status: WebsocketStatus.CONNECTING,
    });
  });

  it("should handle wsOpen", () => {
    expect(wsProfileReducer(initialState, wsOpen)).toEqual({
      ...initialState,
      status: WebsocketStatus.ONLINE,
    });
  });

  it("should handle wsClose", () => {
    expect(wsProfileReducer(initialState, wsClose)).toEqual({
      ...initialState,
      status: WebsocketStatus.OFFLINE,
    });
  });

  it("should handle wsError", () => {
    const errorMessage = "Error wsReducer";

    expect(wsProfileReducer(initialState, wsError(errorMessage))).toEqual({
      ...initialState,
      connectionError: errorMessage,
    });
  });

  it("should handle wsMessage", () => {
    const message = {
      orders: [],
    };
    expect(wsProfileReducer(initialState, wsMessage(message))).toEqual({
      ...initialState,
      orders: message.orders,
    });
  });
});
