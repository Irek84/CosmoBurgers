import React from 'react';
import styles from './burger-ingredients.module.css';
import {Tab, CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientDetails from '../ingredient-details/ingredient-details';
import PropTypes from 'prop-types';
import {dataBurgerPropTypes, selectedIngredientIds} from '../../utils/properties';

const BurgerIngredients = (props) => {    
    const handleClick = (data) => {
      props.setModal({
        visible: true,
        title: "Детали ингредиента",
        content: <IngredientDetails data={data}/>
      })
    }
    
    const IngredientsTypeList = ({title, data }) => {
        return (
          <>
            <div className='text text_type_main-medium mt-10'>{title}</div>
            <ul className={`${styles.ingredient_list} mr-1`}>
                {data.map(x=>(
                    <IngredientCard data={x}  key={x._id}/>
                 ))}
            </ul>
          </>          
        );
      };
      const IngredientCard = ({ data }) => {
        return (
            <li  className={`${styles.ingredient_card} mt-6`} onClick={()=>handleClick(data)}>
                {
                    selectedIngredientIds.filter(x=>x===data._id).length>0
                    ?
                    <Counter count={selectedIngredientIds.filter(x=>x===data._id).length}></Counter>
                    :
                    <></>
                }
                
                <img src={data.image} className="ml-4"></img>
                <div className={`${styles.ingredient_price} text text_type_digits-default mt-1 mb-1`}>{data.price}&nbsp;<CurrencyIcon/></div>
                <div className={`${styles.text_center} text text_type_main-default`}>{data.name}</div>
            </li>
        );
      };      
    return (
      <div className={`${styles.ingredient_block} mr-10`}>
        <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
        <div className={styles.tabs}>
          <Tab value="buns" active={'buns'}>
            Булки
          </Tab>
          <Tab value="sauce">
            Соусы
          </Tab>
          <Tab value="main" >
            Начинки
          </Tab>
        </div>
        <div className={`${styles.ingredient_block_scroll}`}>
          <IngredientsTypeList title="Булки" data={props.data.filter(x=>x.type==='bun')}/>
          <IngredientsTypeList title="Соусы" data={props.data.filter(x=>x.type==='sauce')}/>
          <IngredientsTypeList title="Начинки" data={props.data.filter(x=>x.type==='main')}/>
        </div>
      </div>
    );
}

export default BurgerIngredients;

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(dataBurgerPropTypes.isRequired)
};