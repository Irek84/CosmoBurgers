import React, { useEffect } from "react";
import { useSelector, useDispatch } from "../services/hooks";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import Modal from "../components/modal/modal";

import { getIngredientsEnhancer } from "../services/actions/ingredients";
import { CURRENT_VIEWED_INGREDIENT, CLEAR_CONSTRUCTOR_DATA } from "../services/constants/ingredients";

import { CLOSE_MODAL } from "../services/constants/modal";
import { DELETE_ORDER } from "../services/constants/order";

import styles from "./main.module.css";

function MainPage() {
  const { isLoading, hasError, currentViewedIngredient } = useSelector((store) => store.ingredients);
  const { isModalVisible, modalTitle, modalContent } = useSelector((store) => store.modal);
  const { order } = useSelector((store) => store);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredientsEnhancer());
  }, [dispatch]);

  const closeModal = () => {
    dispatch({
      type: CLOSE_MODAL,
    });
    dispatch({
      type: DELETE_ORDER,
    });
    currentViewedIngredient &&
      dispatch({
        type: CURRENT_VIEWED_INGREDIENT,
        item: null,
      });
  };
  useEffect(() => {
    if (order) {
      if (order?.orderSuccess) {
        dispatch({
          type: CLEAR_CONSTRUCTOR_DATA,
        });
      }
    }
  }, [order, dispatch]);
  return (
    <main>
      <div>
        {isLoading && <div className={`${styles.notification} text text_type_main-medium`}>Загрузка...</div>}
        {hasError && <div className={`${styles.error} text text_type_main-medium`}>Произошла ошибка</div>}
        {!isLoading && !hasError && (
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        )}
      </div>
      {isModalVisible && (
        <Modal title={modalTitle} onClose={closeModal}>
          {modalContent}
        </Modal>
      )}
    </main>
  );
}

export default MainPage;
