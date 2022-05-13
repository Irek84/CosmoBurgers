import React, { useEffect, useState } from 'react';
import styles from './burger-constructor.module.css';
import { CurrencyIcon, ConstructorElement, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import ConstructorIngredient from '../constructor-ingredient/constructor-ingredient';
import OrderDetails from '../order-details/order-details';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { ADD_INGREDIENT } from '../../services/actions/ingredients'
import { OPEN_MODAL } from '../../services/actions/modal';
import { createOrderEnhancer } from '../../services/actions/order';

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item) {
      dispatch({
        type: ADD_INGREDIENT,
        item
      })
    },
    collect: monitor => ({
      isHover: monitor.isOver()
    })
  });

  const { constructorData } = useSelector(store => store.ingredients);
  const { order, orderError, orderIsLoading } = useSelector(store => store.order);
  const bun = constructorData.bun;
  const ingredients = constructorData.ingredients;

  const handleClick = async () => {
		const ingredientIds = [bun._id, ...ingredients.map(ingredient => ingredient._id)];
		dispatch(createOrderEnhancer(ingredientIds));
	}

  useEffect(
    () => {
      if (order?.order?.number > 0) {
        dispatch({
          type: OPEN_MODAL,
          modalContent: <OrderDetails orderNumber={order.order.number}/>
        })
      }
    },
    [order]
  );

  useEffect(
    () => {
      if (orderError) {
        dispatch({
          type: OPEN_MODAL,
          modalTitle: "Ошибка",
          modalContent: <div className='mt-20 mb-20'>Не удалось создать заказ: {orderError}</div>
        })
      }
    },
    [orderError]
  );

  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(
    () => {
      if (constructorData.ingredients.length > 0 || constructorData.bun) {
        setTotalPrice(constructorData.ingredients?.reduce((sum, a) => sum + a.price, 0) + (constructorData?.bun?.price??0)*2) ;
      }
    },
    [constructorData]
  );

  return (
    <div className={`${styles.component} ${isHover ? styles.onHover : ''}`} ref={dropTarget}>
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
      <ul>
        {ingredients.map((ingredient, i) => (
          <ConstructorIngredient ingredient={ingredient} index={i} key={ingredient._uuid} />
        ))}
      </ul>
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
          {totalPrice} <CurrencyIcon type="primary" />
        </span>
        <Button
          type="primary"
          size="large"
          onClick={handleClick}
          disabled={(orderIsLoading || (constructorData.ingredients.length === 0 && constructorData.bun === null)) ? true : false}>
          {orderIsLoading ? "Оформление...." : "Оформить заказ"}
        </Button>
      </div>
    </div>
  );
}

export default React.memo(BurgerConstructor);