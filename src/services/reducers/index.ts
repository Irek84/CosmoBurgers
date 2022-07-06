import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { modalReducer } from "./modal";
import { orderReducer } from "./order";
import { userReducer } from "./user";
import { wsReducer } from "./ws-reducer";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  modal: modalReducer,
  order: orderReducer,
  user: userReducer,
  ws: wsReducer,
});
