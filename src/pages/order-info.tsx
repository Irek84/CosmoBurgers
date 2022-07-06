import React, { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getIngredientsEnhancer } from "../services/actions/ingredients";
import { useDispatch, useSelector } from "../services/hooks";
import { IIngredient, TWsOrder } from "../services/types";
import { getOrder } from "../utils/api";
import DateTitle from "../components/ui/date-title";
import Price from "../components/ui/price";
import StatusTitle from "../components/ui/status-title";
import RoundThumb from "../components/ui/round-thumb";

import styles from "./order-info.module.css";

type TIngredientsCount = {
  item: { [name: string]: IIngredient };
  count: { [name: string]: number };
};

const getBurgerIngredients = (ingredientsId: Array<string>, ingredientData: Array<IIngredient>) =>
  ingredientsId?.map((id: string) => ingredientData.filter((item: IIngredient) => item._id === id))?.flat();

const getOrderPrice = (arr: Array<IIngredient>) => arr?.reduce((acc: number, curr: IIngredient) => (acc += curr.price), 0);

const getIngredientsCount = (arr: Array<IIngredient>) =>
  arr?.reduce(
    (acc: TIngredientsCount, curr: IIngredient) => {
      const id = curr._id;
      acc.item[id] = curr;
      acc.count[id] = (acc.count[id] || 0) + 1;
      return acc;
    },
    { item: {}, count: {} }
  );

function OrderInfoPage() {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();

  const [currentViewedOrder, setCurrentViewedOrder] = useState<TWsOrder>({
    ingredients: [],
    _id: "",
    status: "",
    name: "",
    createdAt: new Date(0),
    updatedAt: new Date(0),
    number: 0,
  });

  useEffect(() => {
    dispatch(getIngredientsEnhancer());
  }, [dispatch]);

  useEffect(() => {
    getOrder(id)
      .then((data: any) => {
        setCurrentViewedOrder({
          ingredients: data.ingredients,
          _id: data._id,
          status: data.status,
          name: data.name,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
          number: data.number,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  const { ingredientData } = useSelector((store) => store.ingredients);
  const burgerIngredients = getBurgerIngredients(currentViewedOrder?.ingredients, ingredientData);
  const uniqIngredients: Array<string> = Array.from(new Set(currentViewedOrder?.ingredients));
  const ingredientsCount = burgerIngredients && getIngredientsCount(burgerIngredients);
  const orderPrice = burgerIngredients && getOrderPrice(burgerIngredients);

  return (
    <div className={styles.main}>
      <div className={styles.component}>
        <h2 className="text text_type_digits-default">#{id}</h2>
        <h1 className="text text_type_main-medium mb-3 mt-10">{currentViewedOrder.name}</h1>
        <StatusTitle status={currentViewedOrder.status} />
        <p className="text text_type_main-medium mb-6 mt-15">Состав:</p>
        <ul className="mt-10">
          {uniqIngredients.map((el: string, i: number) => {
            return (
              <li className="mr-6" key={i}>
                <RoundThumb image={ingredientsCount?.item[el]?.image_mobile} />
                <p className={`${styles.ingredient} ml-4 mr-4 text text_type_main-default`}>{ingredientsCount?.item[el]?.name}</p>
                <Price price={ingredientsCount?.item[el]?.price} count={ingredientsCount?.count[el]} />
              </li>
            );
          })}
        </ul>
        <div className={`${styles.footer} mt-10 mr-6`}>
          <DateTitle date={currentViewedOrder?.createdAt} />
          <Price price={orderPrice} />
        </div>
      </div>
    </div>
  );
}

export default memo(OrderInfoPage);
