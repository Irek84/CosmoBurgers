import React, { useContext, useEffect, useState } from 'react';
import styles from './burger-constructor.module.css';
import { DragIcon, CurrencyIcon, ConstructorElement, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import OrderDetails from '../order-details/order-details';
import { ConstructorContext, TotalPriceContext, OrderNumberContext } from '../../services/appContext';
import PropTypes from 'prop-types';
import { createOrder } from '../../utils/api';

const BurgerConstructor = ({ setModal }) => {
  const { constructorData } = useContext(ConstructorContext);
  const bun = constructorData.bun;
  const ingredients = constructorData.ingredients;
  const { totalPriceState, totalPriceDispatcher } = useContext(TotalPriceContext);
  const { orderNumber, setOrderNumber } = useContext(OrderNumberContext);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    setError(null);
    createOrder(ingredients.map(ingredient => ingredient._id))
      .then(setOrderNumber)
      .finally(() => {
        setIsLoading(false);
      })
      .catch(e => {
        setError(e.message);
      });
  }

  useEffect(
    () => {
      if (orderNumber > 0) {
        setModal({
          visible: true,
          content: <OrderDetails orderNumber={orderNumber} />
        })
      }
    },
    [orderNumber, setModal]
  );

  useEffect(
    () => {
      if (error) {
        setModal({
          visible: true,
          title: "Ошибка",
          content: <div className='mt-20 mb-20'>Не удалось создать заказ: {error}</div>
        });
      }
    },
    [error, setModal]
  );

  useEffect(
    () => {
      if (constructorData.ingredients.length > 0 || constructorData.bun) {
        totalPriceDispatcher({
          type: 'set',
          payload: constructorData.ingredients?.reduce((sum, a) => sum + a.price, 0) + constructorData.bun?.price * 2
        });
      }
    },
    [constructorData, totalPriceDispatcher]
  );

  return (
    <div className={`${styles.component}`}>
      <div className="mb-4 ml-4 mr-4 pl-8 mt-25">
        {
          bun && <ConstructorElement
            text={bun.name + ' (верх)'}
            price={bun.price}
            thumbnail={bun.image}
            isLocked='true'
            type="top"
          />
        }
      </div>
      <div className={`${styles.list}`}>
        {ingredients.map((ingredient, i) => (
          <div key={i} className={`${styles.ingredient} ml-4 mr-4 mb-4 `}>
            <DragIcon type="primary" />
            <i className='ml-2' />
            <ConstructorElement
              text={ingredient.name}
              price={ingredient.price}
              thumbnail={ingredient.image}
            />
          </div>
        ))}
      </div>
      <div className="ml-4 mt-4 mr-4 pl-8">
        {
          bun && <ConstructorElement
            text={bun.name + ' (низ)'}
            price={bun.price}
            thumbnail={bun.image}
            isLocked='true'
            type="bottom"
          />
        }
      </div>
      <div className={`${styles.sendOrder} mt-10 mr-8`}>
        <span className="text text_type_digits-medium mr-10">
          {totalPriceState.totalPrice} <CurrencyIcon type="primary" />
        </span>
        <Button
          type="primary"
          size="large"
          onClick={handleClick}
          disabled={(isLoading || (constructorData.ingredients.length === 0 && constructorData.bun === null)) ? true : false}>
          {isLoading ? "Оформление...." : "Оформить заказ"}
        </Button>
      </div>
    </div>
  );
}

export default React.memo(BurgerConstructor);

BurgerConstructor.propTypes = {
  setModal: PropTypes.func.isRequired
};