import { getIngredients } from '../../utils/api';
export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const getIngredientsAction = () => {
	return function (dispatch) {
		dispatch({
			type: GET_INGREDIENTS_REQUEST
		})
		getIngredients().then((data) => {
			if (data) {
				dispatch({
					type: GET_INGREDIENTS_SUCCESS,
					items: data
				});
			} else {
				dispatch({
					type: GET_INGREDIENTS_FAILED
				});
			}
		}).catch(err => {
			console.error(err)
			dispatch({
				type: GET_INGREDIENTS_FAILED
			})
		})
	};
}