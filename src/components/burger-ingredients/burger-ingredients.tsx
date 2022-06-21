import React, { useMemo, useState, useRef, MutableRefObject, FC, SyntheticEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./burger-ingredients.module.css";
import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import {
  IIngredient,
  IIngredientTypeList,
  IIngredientCard,
} from "../../utils/types";

declare module "react" {
  interface FunctionComponent<P = {}> {
    (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
  }
}

const BurgerIngredients = () => {
  const { ingredientData, constructorData } = useSelector(
    (store: any) => store.ingredients
  );
  const location = useLocation();

  const bunRef = useRef<HTMLParagraphElement>(
    null
  ) as MutableRefObject<HTMLParagraphElement>;
  const sauceRef = useRef<HTMLParagraphElement>(
    null
  ) as MutableRefObject<HTMLParagraphElement>;
  const mainRef = useRef<HTMLParagraphElement>(
    null
  ) as MutableRefObject<HTMLParagraphElement>;

  const [currentTab, setCurrentTab] = useState("buns");

  const onTabClick = (tab: string) => {
    setCurrentTab(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const handleScroll = (e: SyntheticEvent) => {
    const currentY = e.currentTarget.getBoundingClientRect().y + 50;
    const sauceY = sauceRef?.current?.getBoundingClientRect().y;
    const mainY = mainRef?.current?.getBoundingClientRect().y;
    mainY < currentY
      ? setCurrentTab("mains")
      : sauceY < currentY
      ? setCurrentTab("sauces")
      : setCurrentTab("buns");
  };

  const buns = useMemo(
    () =>
      ingredientData.filter(
        (ingredient: IIngredient) => ingredient.type === "bun"
      ),
    [ingredientData]
  );

  const sauces = useMemo(
    () =>
      ingredientData.filter(
        (ingredient: IIngredient) => ingredient.type === "sauce"
      ),
    [ingredientData]
  );

  const mains = useMemo(
    () =>
      ingredientData.filter(
        (ingredient: IIngredient) => ingredient.type === "main"
      ),
    [ingredientData]
  );

  const count = (id: string) => {
    return (
      constructorData.ingredients?.filter(
        (ingredient: IIngredient) => ingredient._id === id
      ).length + (constructorData.bun?._id === id ? 2 : 0)
    );
  };

  const IngredientsTypeList: FC<IIngredientTypeList> = ({
    title,
    data,
    typeId,
    innerRef,
  }) => {
    return (
      <>
        <div
          className="text text_type_main-medium mt-10"
          id={typeId}
          ref={innerRef}
        >
          {title}
        </div>
        <ul className="mr-1">
          {data.map((ingredient) => (
            <IngredientCard data={ingredient} key={ingredient._id} />
          ))}
        </ul>
      </>
    );
  };

  const IngredientCard: FC<IIngredientCard> = ({ data }) => {
    const [{ isDrag }, dragRef] = useDrag({
      type: "ingredient",
      item: { _uuid: uuidv4(), ...data },
      collect: (monitor) => ({
        isDrag: monitor.isDragging(),
      }),
    });
    const opacity = isDrag ? 0.25 : 1;
    return (
      <li
        className="mt-6"
        ref={dragRef}
        style={{ opacity }}
      >
        <Link
          to={{
            pathname: `/ingredients/${data._id}`,
            state: { background: location },
          }}
          className={styles.link}
        >
          {constructorData && count(data._id) > 0 && (
            <Counter count={count(data._id)}></Counter>
          )}

          <img src={data.image} className="ml-4" alt={data.name}></img>
          <div
            className={`${styles.price} text text_type_digits-default mt-1 mb-1`}
          >
            {data.price}&nbsp;
            <CurrencyIcon type={"secondary"} />
          </div>
          <div className="text text_type_main-default">{data.name}</div>
        </Link>
      </li>
    );
  };

  return (
    <div className={`${styles.component} mr-10`}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div className={styles.tabs}>
        <Tab value="buns" active={currentTab === "buns"} onClick={onTabClick}>
          Булки
        </Tab>
        <Tab
          value="sauces"
          active={currentTab === "sauces"}
          onClick={onTabClick}
        >
          Соусы
        </Tab>
        <Tab value="mains" active={currentTab === "mains"} onClick={onTabClick}>
          Начинки
        </Tab>
      </div>
      <div className={`${styles.list}`} onScroll={handleScroll}>
        <IngredientsTypeList
          title="Булки"
          data={buns}
          typeId="buns"
          innerRef={bunRef}
        />
        <IngredientsTypeList
          title="Соусы"
          data={sauces}
          typeId="sauces"
          innerRef={sauceRef}
        />
        <IngredientsTypeList
          title="Начинки"
          data={mains}
          typeId="mains"
          innerRef={mainRef}
        />
      </div>
    </div>
  );
};

export default React.memo(BurgerIngredients);
