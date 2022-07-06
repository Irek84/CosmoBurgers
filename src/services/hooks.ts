import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AppDispatch, RootState, AppThunk, TAppThunk, TAppDispatch } from './types';

//export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();
//export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useDispatch = () => dispatchHook<any>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

//export const useDispatch = () => dispatchHook<TAppDispatch>();
