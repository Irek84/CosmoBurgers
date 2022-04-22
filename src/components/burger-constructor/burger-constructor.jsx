import React from 'react';
import styles from './burger-constructor.module.css';
import {DragIcon, CurrencyIcon, ConstructorElement, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import OrderDetails from '../order-details/order-details';
import {dataBurgerPropTypes, selectedIngredientIds, selectedBunId} from '../../utils/properties';
import PropTypes from 'prop-types';

const BurgerConstructor = (props) => {  
    const bun = props.data.find(x=>x._id==selectedBunId);
    
    const handleClick = () => {
      props.setModal({
        visible: true,
        content: <OrderDetails/>
      })
    }
    
    return (
      <div className={`${styles.constructor_block}`}>
          <div className="mb-4 ml-4 mr-4 pl-8 mt-25">
          <ConstructorElement
            text={bun.name + ' (верх)'}
            price={bun.price}          
            thumbnail={bun.image}
            isLocked='true'
            type="top"
          />
          </div>
        <div className={`${styles.constructor_scroll}`}>
        {props.data.map((x, i)=>(
            selectedIngredientIds.includes(x._id) && x.type!='bun' ?
            <div key={i} className={`${styles.burger_inner_item} ml-4 mr-4 mb-4 `}>
              <DragIcon type="primary" />
              <i className='ml-2'/>
              <ConstructorElement
              text={x.name}
              price={x.price}          
              thumbnail={x.image}
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
          <div className={`${styles.send_order} mt-10 mr-8`}>
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
  data: PropTypes.arrayOf(dataBurgerPropTypes.isRequired)
};