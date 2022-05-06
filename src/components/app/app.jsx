import React, { useEffect, useState, useReducer } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import { getIngredients } from '../../utils/api';
import { ConstructorContext, TotalPriceContext, OrderNumberContext } from '../../service/appContext';
import { constructorDataPrepare } from '../../utils/functions';

function App() {
  const [ingredientData, setIngredientData] = useState([]);
  const [constructorData, setConstructorData] = useState({ bun: null, ingredients: [] });
  const [orderNumber, setOrderNumber] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [modal, setModal] = useState({
    visible: false,
    title: null,
    content: null
  });

  const totalPriceInitialState = { totalPrice: 0 };
  const [totalPriceState, totalPriceDispatcher] = useReducer(totalPriceReducer, totalPriceInitialState, undefined);
  
  function totalPriceReducer(state, action) {
    switch (action.type) {
      case "set":
        return { totalPrice: action.payload };
      case "reset":
        return { totalPrice: totalPriceInitialState };
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  }

  useEffect(() => {
    getIngredients()
      .then((data) => {
        setIngredientData(data);
        setConstructorData(constructorDataPrepare(data))
        setHasError(false);
      })
      .finally(() => {
        setIsLoading(false);
      })
      .catch(e => {
        console.error(e)
        setHasError(true);
      });
  }, []);

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
            ingredientData.length &&
            <>
              <ConstructorContext.Provider value={{ ingredientData, constructorData }}>
                <BurgerIngredients setModal={setModal} />
                <TotalPriceContext.Provider value={{ totalPriceState, totalPriceDispatcher }}>
                  <OrderNumberContext.Provider value={{ orderNumber, setOrderNumber }}>
                    <BurgerConstructor setModal={setModal} />
                  </OrderNumberContext.Provider>
                </TotalPriceContext.Provider>
              </ConstructorContext.Provider>
            </>
          }
        </div>
        {modal.visible && <Modal setModal={setModal} title={modal.title}>{modal.content}</Modal>}
      </main>
    </>
  );
}

export default App;