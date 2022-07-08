import { TypedUseSelectorHook, useDispatch as dispatchHook, useSelector as selectorHook } from "react-redux";
import { RootState, TAppThunk, TAppDispatch } from "./types";

export const useDispatch = () => dispatchHook<TAppDispatch | TAppThunk>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
