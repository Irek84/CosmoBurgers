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
import { IIngredient, IIngredientExtended } from "../types";

export type TIngredientsState = {
  isLoading: boolean;
  hasError: boolean;
  ingredientData: Array<IIngredient>;
  constructorData: {
    bun: null | IIngredientExtended;
    ingredients: Array<IIngredientExtended>;
  };
  currentViewedIngredient: null | IIngredient; //Проверить использование
};

const initialState: TIngredientsState = {
  isLoading: false,
  hasError: false,
  ingredientData: [],
  constructorData: {
    bun: null,
    ingredients: [],
  },
  currentViewedIngredient: null,
};

export const ingredientsReducer = (state = initialState, action: TIngredientsActions): TIngredientsState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        hasError: false,
        isLoading: false,
        ingredientData: action.items,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ingredientData: [],
        constructorData: { bun: null, ingredients: [] },
        currentViewedIngredient: null,
        hasError: true,
        isLoading: false,
      };
    }
    case ADD_INGREDIENT: {
      const { type } = action.item;
      if (type === "bun") {
        return {
          ...state,
          constructorData: {
            ...state.constructorData,
            bun: action.item,
          },
        };
      }
      return {
        ...state,
        constructorData: {
          ...state.constructorData,
          ingredients: [...state.constructorData.ingredients, action.item],
        },
      };
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        constructorData: {
          ...state.constructorData,
          ingredients: [...state.constructorData.ingredients].filter((ingredient) => ingredient._uuid !== action.id),
        },
      };
    }
    case REARRANGE_INGREDIENTS: {
      const rearrangedIngredients = [...state.constructorData.ingredients];
      rearrangedIngredients.splice(action.toIndex, 0, rearrangedIngredients.splice(action.fromIndex, 1)[0]);
      return {
        ...state,
        constructorData: {
          ...state.constructorData,
          ingredients: rearrangedIngredients,
        },
      };
    }
    case CURRENT_VIEWED_INGREDIENT: {
      return {
        ...state,
        currentViewedIngredient: action.item,
      };
    }
    case CLEAR_CONSTRUCTOR_DATA: {
      return { ...state, constructorData: { bun: null, ingredients: [] } };
    }
    default: {
      return state;
    }
  }
};
