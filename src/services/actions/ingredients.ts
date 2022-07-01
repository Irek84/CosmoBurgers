import { getIngredients } from "../../utils/api";
import { IIngredient, IIngredientExtended } from "../types";
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  REARRANGE_INGREDIENTS,
  CURRENT_VIEWED_INGREDIENT,
  CLEAR_CONSTRUCTOR_DATA,
} from "../constants/ingredients";
import { AppDispatch, AppThunk } from '../types';

export interface IGetIngredientsRequestAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}
export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly items: Array<IIngredient>;
}
export interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}
export interface IAddIngredientAction {
  readonly type: typeof ADD_INGREDIENT;
  readonly item: IIngredientExtended;
}
export interface IDeleteIngredientAction {
  readonly type: typeof DELETE_INGREDIENT;
  readonly id: string;
}
export interface IRearrangeIngredientAction {
  readonly type: typeof REARRANGE_INGREDIENTS;
  readonly fromIndex: number;
  readonly toIndex: number;
}
export interface ICurrentViewedIngredientAction {
  readonly type: typeof CURRENT_VIEWED_INGREDIENT;
  readonly item: IIngredientExtended;
}
export interface IClearConstructorDataAction {
  readonly type: typeof CLEAR_CONSTRUCTOR_DATA;
}

export type TIngredientsActions =
  | IGetIngredientsRequestAction
  | IGetIngredientsSuccessAction
  | IGetIngredientsFailedAction
  | IAddIngredientAction
  | IDeleteIngredientAction
  | IRearrangeIngredientAction
  | ICurrentViewedIngredientAction
  | IClearConstructorDataAction;

export const getIngredientsEnhancer: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    getIngredients()
      .then((data) => {
        if (data) {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            items: data,
          });
        } else {
          dispatch({
            type: GET_INGREDIENTS_FAILED,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        });
      });
  };
};
