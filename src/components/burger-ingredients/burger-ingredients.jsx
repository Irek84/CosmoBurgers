import React from 'react';
import styles from './burger-ingredients.module.css';
import {Tab, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
import {dataBurgerPropTypes} from '../../utils/data';


const BurgerIngredients = (props) => {     
    const IngredientsTypeList = ({ data }) => {
        return (
            <ul className={`${styles.ingredient_list} ml-4 mt-6`}>
                {data.map(x=>(
                    <IngredientCard data={x}  key={x._id}/>
                 ))}
            </ul>
            
        );
      };
      const IngredientCard = ({ data }) => {
        return (
            <li key={data._id} className={`${styles.ingredient_card}`}>
                <img src={data.image} className="ml-4"></img>
                <div className={`${styles.ingredient_price} text text_type_digits-default mt-1 mb-1`}>{data.price}&nbsp;<CurrencyIcon/></div>
                <div className={`${styles.text_center} text text_type_main-default text-center`}>{data.name}</div>
            </li>
        );
      };      
    return (
      <div className={`${styles.ingredient_block}`}>
          <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
          <div style={{ display: 'flex' }}>
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
    <div className='text text_type_main-medium mt-10'>Булки</div>
    <IngredientsTypeList data={props.data.filter(x=>x.type==='bun')}/>

    <div className='text text_type_main-medium mt-10'>Соусы</div>
    <IngredientsTypeList data={props.data.filter(x=>x.type==='sauce')}/>

    <div className='text text_type_main-medium mt-10'>Начинки</div>
    <IngredientsTypeList data={props.data.filter(x=>x.type==='main')}/>
    </div>


      </div>
    );

}

export default BurgerIngredients;

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(dataBurgerPropTypes)
  };