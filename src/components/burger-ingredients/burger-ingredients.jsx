import React, { useContext, useMemo, useState } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientDetails from '../ingredient-details/ingredient-details';
import PropTypes from 'prop-types';
import { ConstructorContext } from '../../service/appContext';

const BurgerIngredients = ({ setModal }) => {
  const [currentTab, setCurrentTab] = useState('buns')
  const { ingredientData, constructorData } = useContext(ConstructorContext);

  const handleClick = (data) => {
    setModal({
      visible: true,
      title: "Детали ингредиента",
      content: <IngredientDetails data={data} />
    })
  }

  const onTabClick = (tab) => {
    setCurrentTab(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: "smooth" });
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

  const IngredientsTypeList = ({ title, data, typeId }) => {
    return (
      <>
        <div className='text text_type_main-medium mt-10' id={typeId}>{title}</div>
        <ul className='mr-1'>
          {data.map(ingredient => (
            <IngredientCard data={ingredient} key={ingredient._id} />
          ))}
        </ul>
      </>
    );
  };

  const IngredientCard = ({ data }) => {
    return (
      <li className='mt-6' onClick={() => handleClick(data)}>
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
      <div className={`${styles.list}`}>
        <IngredientsTypeList title="Булки" data={buns} typeId="buns" />
        <IngredientsTypeList title="Соусы" data={sauces} typeId="sauces" />
        <IngredientsTypeList title="Начинки" data={mains} typeId="mains" />
      </div>
    </div >
  );
}

export default React.memo(BurgerIngredients);

BurgerIngredients.propTypes = {
  setModal: PropTypes.func.isRequired
};