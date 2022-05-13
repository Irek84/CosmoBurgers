import React from 'react';
import styles from './constructor-ingredient.module.css';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import {dataBurgerPropTypes} from '../../utils/properties';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { DELETE_INGREDIENT, REARRANGE_INGREDIENTS } from '../../services/actions/ingredients'

const ConstructorIngredient = (props) => {
  const { ingredient, index } = props;
  const dispatch = useDispatch();
  const removeConstructorIngredient = (id) => {
    dispatch({
      type: DELETE_INGREDIENT,
      id: id
    })
  }

  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: 'draggedIngredient',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) return

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return

      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return

      dispatch({
        type: REARRANGE_INGREDIENTS,
        fromIndex: dragIndex ?? index,
        toIndex: hoverIndex,
      })

      item.index = hoverIndex
    },
  })

  const [{ opacity }, drag] = useDrag({
    type: 'draggedIngredient',
    ingredient: () => {
      return { ingredient, index }
    },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.3 : 1
    })
  });

  drag(drop(ref));

  return (
    <li ref={ref} className={`${styles.item} mb-4`} style={{ opacity }} data-handler-id={handlerId}>
      <DragIcon type="primary" />
      <i className='ml-2' />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => removeConstructorIngredient(ingredient._uuid)}
      />
    </li>
  );
}

export default React.memo(ConstructorIngredient);

ConstructorIngredient.propTypes = {
	ingredient: dataBurgerPropTypes.isRequired,
  index: PropTypes.number.isRequired
};