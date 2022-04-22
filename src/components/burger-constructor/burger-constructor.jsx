import React from 'react';
import styles from './burger-constructor.module.css';
import {DragIcon, CurrencyIcon, ConstructorElement, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import OrderDetails from '../order-details/order-details';
import {dataBurgerPropTypes, selectedIngredientIds, selectedBunId} from '../../utils/properties';
import PropTypes from 'prop-types';

const BurgerConstructor = ({setModal, data}) => {  
    const bun = data.find(ingredient=>ingredient._id==selectedBunId);
    
    const handleClick = () => {
      setModal({
        visible: true,
        content: <OrderDetails orderNumber='034536'/>
      })
    }
    
    return (
      <div className={`${styles.component}`}>
          <div className="mb-4 ml-4 mr-4 pl-8 mt-25">
          <ConstructorElement
            text={bun.name + ' (верх)'}
            price={bun.price}          
            thumbnail={bun.image}
            isLocked='true'
            type="top"
          />
          </div>
        <div className={`${styles.list}`}>
        {data.map((ingredient, i)=>(
            selectedIngredientIds.includes(ingredient._id) && ingredient.type!='bun' ?
            <div key={i} className={`${styles.ingredient} ml-4 mr-4 mb-4 `}>
              <DragIcon type="primary" />
              <i className='ml-2'/>
              <ConstructorElement
              text={ingredient.name}
              price={ingredient.price}          
              thumbnail={ingredient.image}
              />
            </div>
            :
            <React.Fragment key={i}></React.Fragment>
          ))}
          </div>
          <div className="ml-4 mt-4 mr-4 pl-8">
          <ConstructorElement
            text={bun.name + ' (низ)'}
            price={bun.price}          
            thumbnail={bun.image}
            isLocked='true'
            type="bottom"
          />
          </div>
          <div className={`${styles.sendOrder} mt-10 mr-8`}>
            <span className="text text_type_digits-medium mr-10">610 <CurrencyIcon type="primary" /></span> 
            <Button type="primary" size="large" onClick={handleClick}>
              Оформить заказ
            </Button>
          </div>
      </div>
    );
}

export default BurgerConstructor;

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(dataBurgerPropTypes),
  setModal: PropTypes.func.isRequired
};