import React, { useMemo, useState, useRef } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useSelector, useDispatch } from 'react-redux';
import { OPEN_MODAL } from '../../services/actions/modal';
import { CURRENT_VIEWED_INGREDIENT } from '../../services/actions/ingredients';
import { useDrag } from "react-dnd";
import { v4 as uuidv4 } from 'uuid';

const BurgerIngredients = () => {
  const dispatch = useDispatch();
  const { ingredientData, constructorData } = useSelector(store => store.ingredients);

  const handleClick = (data) => {
    dispatch({
      type: CURRENT_VIEWED_INGREDIENT,
      item: data
    })
    dispatch({
      type: OPEN_MODAL,
      modalTitle: "Детали ингредиента",
      modalContent: <IngredientDetails data={data} />
    })
  }
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);
  const [currentTab, setCurrentTab] = useState('buns');

  const onTabClick = (tab) => {
    setCurrentTab(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  }

  const handleScroll = (e) => {
    const currentY = e.currentTarget.getBoundingClientRect().y + 50;
    const sauceY = sauceRef?.current?.getBoundingClientRect().y;
    const mainY = mainRef?.current?.getBoundingClientRect().y;
    mainY < currentY ?
      setCurrentTab('mains')
      : sauceY < currentY ?
        setCurrentTab('sauces')
        : setCurrentTab('buns');
  }

  const buns = useMemo(
    () => ingredientData.filter(ingredient => ingredient.type === 'bun'),
    [ingredientData]
  )

  const sauces = useMemo(
    () => ingredientData.filter(ingredient => ingredient.type === 'sauce'),
    [ingredientData]
  )

  const mains = useMemo(
    () => ingredientData.filter(ingredient => ingredient.type === 'main'),
    [ingredientData]
  )

  const count = (id) => {
    return constructorData.ingredients?.filter(ingredient => ingredient._id === id).length + (constructorData.bun?._id === id ? 2 : 0)
  }

  const IngredientsTypeList = ({ title, data, typeId, innerRef }) => {
    return (
      <>
        <div className='text text_type_main-medium mt-10' id={typeId} ref={innerRef}>{title}</div>
        <ul className='mr-1'>
          {data.map(ingredient => (
            <IngredientCard data={ingredient} key={ingredient._id} />
          ))}
        </ul>
      </>
    );
  };

  const IngredientCard = ({ data }) => {
    const [{ isDrag }, dragRef] = useDrag({
      type: "ingredient",
      item: { _uuid: uuidv4(), ...data },
      collect: monitor => ({
        isDrag: monitor.isDragging()
      })
    });
    const opacity = isDrag ? 0.25 : 1;
    return (
      <li className='mt-6' onClick={() => handleClick(data)} ref={dragRef} style={{ opacity }}>
        {constructorData &&
          count(data._id) > 0
          &&
          <Counter count={count(data._id)}></Counter>
        }

        <img src={data.image} className="ml-4" alt={data.name}></img>
        <div className={`${styles.price} text text_type_digits-default mt-1 mb-1`}>{data.price}&nbsp;<CurrencyIcon /></div>
        <div className='text text_type_main-default'>{data.name}</div>
      </li>
    );
  };

  return (
    <div className={`${styles.component} mr-10`}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div className={styles.tabs}>
        <Tab value="buns" active={currentTab === 'buns'} onClick={onTabClick}>
          Булки
        </Tab>
        <Tab value="sauces" active={currentTab === 'sauces'} onClick={onTabClick}>
          Соусы
        </Tab>
        <Tab value="mains" active={currentTab === 'mains'} onClick={onTabClick}>
          Начинки
        </Tab>
      </div>
      <div className={`${styles.list}`} onScroll={handleScroll}>
        <IngredientsTypeList title="Булки" data={buns} typeId="buns" innerRef={bunRef} />
        <IngredientsTypeList title="Соусы" data={sauces} typeId="sauces" innerRef={sauceRef} />
        <IngredientsTypeList title="Начинки" data={mains} typeId="mains" innerRef={mainRef} />
      </div>
    </div >
  );
}

export default React.memo(BurgerIngredients);