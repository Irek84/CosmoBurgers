import {
	GET_INGREDIENTS_REQUEST,
	GET_INGREDIENTS_SUCCESS,
	GET_INGREDIENTS_FAILED,

} from '../actions/ingredients';

const initialState = {
	isLoading: false,
	hasError: false,
	ingredientData: [],
	constructorData: {
		bun: null,
		ingredients: []
	},
};

export const ingredientsReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_INGREDIENTS_REQUEST: {
			return {
				...state,
				isLoading: true,
				hasError: false,
			};
		}
		case GET_INGREDIENTS_SUCCESS: {
			return { ...state, hasError: false, isLoading: false, ingredientData: action.items };
		}
		case GET_INGREDIENTS_FAILED: {
			return { ...state, hasError: true, isLoading: false };
		}
		default: {
			return state;
		}
	}
};