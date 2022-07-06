import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./burger-constructor.module.css";
import { CurrencyIcon, ConstructorElement, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorIngredient from "../constructor-ingredient/constructor-ingredient";
import OrderDetails from "../order-details/order-details";
import { useDispatch, useSelector } from "../../services/hooks";
import { useDrop } from "react-dnd";
import { ADD_INGREDIENT } from "../../services/constants/ingredients";
import { OPEN_MODAL } from "../../services/constants/modal";
import { createOrderEnhancer } from "../../services/actions/order";
import { IIngredientExtended } from "../../services/types";
declare module "react" {
  interface FunctionComponent<P = {}> {
    (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
  }
}
const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      dispatch({
        type: ADD_INGREDIENT,
        item,
      });
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });
  const { isAuthenthicated } = useSelector((store) => store.user);
  const { constructorData } = useSelector((store) => store.ingredients);
  const { order, orderError, orderIsLoading } = useSelector((store) => store.order);
  const bun = constructorData.bun;
  const ingredients: IIngredientExtended[] = constructorData.ingredients;
  const history = useHistory();
  const handleClick = async () => {
    if (isAuthenthicated) {
      const ingredientIds: string[] = [bun!._id, ...ingredients.map((ingredient) => ingredient._id), bun!._id];
      dispatch(createOrderEnhancer(ingredientIds) as any);
    } else {
      history.replace({ pathname: "/login" });
    }
  };

  useEffect(() => {
    if (order) {
      if (order!.order?.number > 0) {
        dispatch({
          type: OPEN_MODAL,
          modalContent: <OrderDetails orderNumber={order!.order.number} />,
        });
      }
    }
  }, [order, dispatch]);

  useEffect(() => {
    if (orderError) {
      dispatch({
        type: OPEN_MODAL,
        modalTitle: "Ошибка",
        modalContent: <div className="mt-20 mb-20">Не удалось создать заказ: {orderError}</div>,
      });
    }
  }, [orderError, dispatch]);

  const [totalPrice, setTotalPrice] = useState<number>(0);
  useEffect(() => {
    if (constructorData.ingredients.length > 0 || constructorData.bun) {
      setTotalPrice(constructorData.ingredients?.reduce((sum: number, a: IIngredientExtended) => sum + a.price, 0) + (constructorData?.bun?.price ?? 0) * 2);
    } else {
      setTotalPrice(0);
    }
  }, [constructorData]);

  return (
    <div className={`${styles.component} ${isHover ? styles.onHover : ""}`} ref={dropTarget}>
      <div className="mb-4 ml-4 mr-4 pl-8 mt-25">
        {bun && <ConstructorElement text={bun.name + " (верх)"} price={bun.price} thumbnail={bun.image} isLocked={true} type="top" />}
      </div>
      <ul>
        {ingredients.map((ingredient: IIngredientExtended, i: number) => (
          <ConstructorIngredient ingredient={ingredient} index={i} key={ingredient._uuid} />
        ))}
      </ul>
      <div className="ml-4 mt-4 mr-4 pl-8">
        {bun && <ConstructorElement text={bun.name + " (низ)"} price={bun.price} thumbnail={bun.image} isLocked={true} type="bottom" />}
      </div>
      <div className={`${styles.sendOrder} mt-10 mr-8`}>
        <span className="text text_type_digits-medium mr-10">
          {totalPrice} <CurrencyIcon type="primary" />
        </span>
        <Button type="primary" size="large" onClick={handleClick} disabled={orderIsLoading || bun === null ? true : false}>
          {orderIsLoading ? "Оформление...." : "Оформить заказ"}
        </Button>
      </div>
    </div>
  );
};

export default React.memo(BurgerConstructor);
