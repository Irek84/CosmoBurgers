import { ingredientsReducer, initialState } from "./ingredients";
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
import { TIngredientsActions } from "../actions/ingredients";

describe("ingredient reducer", () => {
  it("should return the initial state", () => {
    expect(ingredientsReducer(undefined, {} as TIngredientsActions)).toEqual(initialState);
  });
  it("should handle GET_INGREDIENTS_REQUEST", () => {
    const state = {
      ...initialState,
      isLoading: true,
      hasError: false,
    };
    expect(
      ingredientsReducer(undefined, {
        type: GET_INGREDIENTS_REQUEST,
      })
    ).toEqual(state);
  });
  it("should handle GET_INGREDIENTS_SUCCESS", () => {
    const state = {
      ...initialState,
      hasError: false,
      isLoading: false,
      ingredientData: [],
    };
    expect(ingredientsReducer(undefined, { type: GET_INGREDIENTS_SUCCESS, items: [] })).toEqual(state);
  });
  it("should handle GET_INGREDIENTS_FAILED", () => {
    const state = {
      ...initialState,
      ingredientData: [],
      constructorData: { bun: null, ingredients: [] },
      currentViewedIngredient: null,
      hasError: true,
      isLoading: false,
    };
    expect(ingredientsReducer(undefined, { type: GET_INGREDIENTS_FAILED })).toEqual(state);
  });
  it("should handle ADD_INGREDIENT", () => {
    const ingredient = {
      _id: "",
      name: "",
      type: "",
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 0,
      price: 0,
      image: "",
      image_mobile: "",
      image_large: "",
      _uuid: "",
      index: 0,
    };
    const state = {
      ...initialState,
      constructorData: {
        bun: null,
        ingredients: [ingredient],
      },
    };
    expect(ingredientsReducer(undefined, { type: ADD_INGREDIENT, item: ingredient })).toEqual(state);
  });
  it("should handle DELETE_INGREDIENT", () => {
    const ingredient = {
      _id: "",
      name: "",
      type: "",
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 0,
      price: 0,
      image: "",
      image_mobile: "",
      image_large: "",
      _uuid: "",
      index: 0,
    };
    const state = {
      ...initialState,
      constructorData: {
        bun: null,
        ingredients: [],
      },
    };
    expect(ingredientsReducer(undefined, { type: DELETE_INGREDIENT, id: "" })).toEqual(state);
  });
  it("should handle REARRANGE_INGREDIENTS", () => {

    const state = {
      ...initialState,
      constructorData: {
        ...initialState.constructorData,
        ingredients: [undefined],
        undefined,
      },
    };
    expect(ingredientsReducer(undefined, { type: REARRANGE_INGREDIENTS, fromIndex: 0, toIndex: 1 })).toEqual(state);
  });
  it("should handle CURRENT_VIEWED_INGREDIENT", () => {
    const currentIngredient = {
      _id: "",
      name: "",
      type: "",
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 0,
      price: 0,
      image: "",
      image_mobile: "",
      image_large: "",
      _uuid: "",
      index: 0,
    };
    const state = {
      ...initialState,
      currentViewedIngredient: currentIngredient,
    };
    expect(ingredientsReducer(undefined, { type: CURRENT_VIEWED_INGREDIENT, item: currentIngredient })).toEqual(state);
  });
  it("should handle CLEAR_CONSTRUCTOR_DATA", () => {
    const state = {
      ...initialState,
      constructorData: { bun: null, ingredients: [] },
    };
    expect(ingredientsReducer(undefined, { type: CLEAR_CONSTRUCTOR_DATA })).toEqual(state);
  });
});
