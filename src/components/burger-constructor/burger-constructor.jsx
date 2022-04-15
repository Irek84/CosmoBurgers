import React from 'react';
import styles from './burger-constructor.module.css';
import {DragIcon, CurrencyIcon, ConstructorElement, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import {dataBurgerPropTypes} from '../../utils/data';
import PropTypes from 'prop-types';

const BurgerConstructor = (props) => {  
    const SelectedBunId = '60666c42cc7b410027a1a9b1';
    const bunTop = props.data.find(x=>x.id=SelectedBunId);
    const bunBottom = props.data.find(x=>x.id=SelectedBunId);
    return (
      <div className={`${styles.constructor_block}`}>
          <div className="mb-4 ml-4 mr-4 pl-8 mt-25">
          <ConstructorElement
            text={bunTop.name + ' (верх)'}
            price={bunTop.price}          
            thumbnail={bunTop.image}
            isLocked='true'
            type="top"
          />
          </div>
        <div className={`${styles.constructor_scroll}`}>
          {props.data.map(x=>(
            x.id!==SelectedBunId ?
            <div key={x._id}  className={`${styles.burger_inner_item} ml-4 mr-4 mb-4 `}>
              <DragIcon type="primary" />
              <i className='ml-2'/>
              <ConstructorElement
              text={x.name}
              price={x.price}          
              thumbnail={x.image}
              />
            </div>
            :
            <></>
          ))}
          </div>
          <div className="ml-4 mt-4 mr-4 pl-8">
          <ConstructorElement
            text={bunBottom.name + ' (низ)'}
            price={bunBottom.price}          
            thumbnail={bunBottom.image}
            isLocked='true'
            type="bottom"
          />
          </div>
          <div className={`${styles.send_order} mt-10 mr-8`}>
            <span className="text text_type_digits-medium mr-10">610 <CurrencyIcon type="primary" /></span> 
            <Button type="primary" size="large">
              Оформить заказ
            </Button>
          </div>
      </div>
    );
}

export default BurgerConstructor;

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(dataBurgerPropTypes)
};