import React from 'react';
import styles from './burger-constructor.css';
import {DragIcon, CurrencyIcon, ConstructorElement, Button} from '@ya.praktikum/react-developer-burger-ui-components'


class BurgerConstructor extends React.Component {
  render() {
    const SelectedBunId = '60666c42cc7b410027a1a9b1';
    const bunTop = this.props.data.find(x=>x.id=SelectedBunId);
    const bunBottom = this.props.data.find(x=>x.id=SelectedBunId);
    return (
      <div>
          
          <div className="mb-4 ml-4 mr-4 pl-8 mt-25">
          <ConstructorElement
            text={bunTop.name + ' (верх)'}
            price={bunTop.price}          
            thumbnail={bunTop.image}
            isLocked='true'
            type="top"
          />
          </div>
        <div className='constructor-scroll'>
          {this.props.data.map(x=>(
            x.id!==SelectedBunId ?
            <div key={x._id} className="ml-4 mr-4 mb-4 flex-v-center burger-inner-item">
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
          <div className='mt-10 mr-8 f-right flex-v-center'>
          <span className="text text_type_digits-medium mr-10">610 <CurrencyIcon type="primary" /></span> 
          <Button type="primary" size="large">
            Оформить заказ
          </Button>
          </div>
      </div>
    );
  }
}

export default BurgerConstructor;