import { MutableRefObject } from "react";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { Action, ActionCreator, AnyAction } from "redux";
import { store } from "./store";
import { TIngredientsActions } from "./actions/ingredients";
import { TOrderActions } from "./actions/order";
import { TModalActions } from "./actions/modal";
import { TUserActions } from "./actions/user";

type TApplicationActions = TIngredientsActions | TOrderActions | TModalActions | TUserActions;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<ThunkAction<ReturnType, Action, RootState, TApplicationActions>>;

export type TAppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;
export type TAppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  never,
  TApplicationActions
  >;

//export type AppDispatch = typeof store.dispatch & ThunkDispatch<RootState, null, AnyAction>
//export type AppThunk = ThunkAction<void, RootState, null, TApplicationActions>

export interface IIngredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
}

export interface IIngredientExtended extends IIngredient {
  _uuid: string;
  index: number;
}
export type TCurrentViewedIngredient = Pick<IIngredient, "name" | "image_large" | "calories" | "proteins" | "fat" | "carbohydrates"> & { isLoading: boolean };

export interface ICurrentViewedIngredient {
  image_large: string;
  name: string;
  calories: string;
  proteins: string;
  fat: string;
  carbohydrates: string;
  isLoading: boolean;
}

export interface IIngredientTypeList {
  title: string;
  data: Array<IIngredient>;
  typeId: string;
  innerRef: MutableRefObject<HTMLParagraphElement>;
}

export interface IIngredientCard {
  data: IIngredient;
}

export interface INutritionFact {
  name: string;
  fact: number;
}

export interface IIngredientDetails {
  title?: string;
}

export interface IParamTypes {
  id: string;
}

export type TUser = {
  name: string;
  email: string;
  password: string;
};

export type TTarget = { target: { name: string; value: string } };

export type TNewPassword = { newPassword: string; token: string };
export type TTokenBody = { token: string | undefined };

export type TOrder = {
  name: string;
  order: {
    ingredients: Array<IIngredient>;
    _id: string;
    owner: {
      email: string;
      name: string;
      createdAt: Date;
      updatedAt: Date;
    };
    status: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    number: number;
    price: number;
  };
};

export type TCheckSuccess<T> = T & {
  success: boolean;
  message: string;
};

export type TIngredientsData = {
  data: Array<IIngredient>;
};

export type TWsAction = {
  wsInit: string;
  wsClose: string;
  onOpen: string;
  onClose: string;
  onError: string;
  onMessage: string;
};

export type TWsOrder = {
    ingredients: Array<string>;
    _id: string;
    status: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    number: number;
};

export type TWsOrders = {
  success: boolean;
	orders: Array<TWsOrder>;
	total: number;
	totalToday: number;
}