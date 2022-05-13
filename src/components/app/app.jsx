import React, { useEffect} from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';

import { getIngredientsEnhancer } from '../../services/actions/ingredients';
import { useSelector, useDispatch } from 'react-redux';

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { CLOSE_MODAL } from '../../services/actions/modal';
import { CURRENT_VIEWED_INGREDIENT } from '../../services/actions/ingredients';

function App() {
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
    currentViewedIngredient && dispatch({
      type: CURRENT_VIEWED_INGREDIENT,
      item: null
    })
  }

  return (
    <>
      <AppHeader />
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
    </>
  );
}

export default App;