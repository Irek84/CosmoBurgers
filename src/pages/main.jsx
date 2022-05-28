import React, { useEffect} from 'react';
import styles from  './main.module.css';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import Modal from '../components/modal/modal';

import { getIngredientsEnhancer } from '../services/actions/ingredients';
import { useSelector, useDispatch } from 'react-redux';

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { CLOSE_MODAL } from '../services/actions/modal';
import { CURRENT_VIEWED_INGREDIENT } from '../services/actions/ingredients';
import { DELETE_ORDER } from '../services/actions/order';

const MainPage = () => {
  const { isLoading, hasError, currentViewedIngredient} = useSelector(store => store.ingredients);
  const { isModalVisible, modalTitle, modalContent } = useSelector(store => store.modal)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredientsEnhancer())
  }, [dispatch])

  const closeModal = () => {
    dispatch({
      type: CLOSE_MODAL
    })
    dispatch({
      type: DELETE_ORDER
    })
    currentViewedIngredient && dispatch({
      type: CURRENT_VIEWED_INGREDIENT,
      item: null
    })
  }

  return (
    <main>
    <div>
      {isLoading && <div className={`${styles.notification} text text_type_main-medium`}>Загрузка...</div>}
      {hasError && <div className={`${styles.error} text text_type_main-medium`}>Произошла ошибка</div>}
      {
        !isLoading &&
        !hasError &&
        //ingredientData.length &&
        <>

          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider> 
        </>
      }
    </div>
     {isModalVisible && <Modal title={modalTitle} onClose={closeModal}>{modalContent}</Modal>} 
  </main>
  );
}

export default MainPage;