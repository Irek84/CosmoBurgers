import React from 'react';
import './burger-ingredients.css';
import {Tab, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
import {dataBurgerPropTypes} from '../../utils/data';

class BurgerIngredients extends React.Component {
  render() {
    const IngredientsTypeList = ({ data }) => {
        return (
            <ul className='ingredient-list ml-4 mt-6'>
                {data.map(x=>(
                    <IngredientCard data={x} key={x._id}/>
                ))}
            </ul>
            
        );
      };
      const IngredientCard = ({ data }) => {
        return (

            <li key={data._id} className="ingredient-card">
                <img src={data.image} className="ml-4"></img>
                <div  className="text text_type_digits-default ingredient-price mt-1 mb-1">{data.price}&nbsp;<CurrencyIcon/></div>
                <div className="text text_type_main-default text-center">{data.name}</div>
            </li>
          
        );
      };      
    return (
      <div className='mr-10'>
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
    <div className='text text_type_main-medium mt-10'>Булки</div>
    <IngredientsTypeList data={this.props.data.filter(x=>x.type==='bun')}/>

    <div className='text text_type_main-medium mt-10'>Соусы</div>
    <IngredientsTypeList data={this.props.data.filter(x=>x.type==='sauce')}/>

    <div className='text text_type_main-medium mt-10'>Начинки</div>
    <IngredientsTypeList data={this.props.data.filter(x=>x.type==='main')}/>

      </div>
    );
  }
}

export default BurgerIngredients;

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(dataBurgerPropTypes)
  };