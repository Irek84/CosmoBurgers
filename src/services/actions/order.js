import { createOrder } from "../../utils/api";

export const CREATE_ORDER_REQUEST = "CREATE_ORDER_REQUEST";
export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS";
export const CREATE_ORDER_FAILED = "CREATE_ORDER_FAILED";
export const DELETE_ORDER = "DELETE_ORDER";

export const createOrderEnhancer = (ingredientIds) => {
  return function (dispatch) {
    dispatch({
      type: CREATE_ORDER_REQUEST,
    });
    createOrder(ingredientIds)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: CREATE_ORDER_SUCCESS,
            order: res,
          });
        } else {
          dispatch({
            type: CREATE_ORDER_FAILED,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: CREATE_ORDER_FAILED,
          error: err.message,
        });
      });
  };
};
