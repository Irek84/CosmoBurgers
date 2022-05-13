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

function App() {
  const { isLoading, hasError } = useSelector(store => store.ingredients);
  const { isModalVisible, modalTitle, modalContent } = useSelector(store => store.modal)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredientsEnhancer())
  }, [dispatch])

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
        {isModalVisible && <Modal title={modalTitle}>{modalContent}</Modal>}
      </main>
    </>
  );
}

export default App;