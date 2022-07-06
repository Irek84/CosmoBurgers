import React, { FC, MutableRefObject, useRef } from "react";
import { useDispatch } from "../../services/hooks";
import { DropTargetMonitor, useDrag, useDrop } from "react-dnd";
import { DragIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DELETE_INGREDIENT, REARRANGE_INGREDIENTS } from "../../services/constants/ingredients";

import { IIngredientExtended } from "../../services/types";

import styles from "./constructor-ingredient.module.css";

type TConstructorIngredient = {
  ingredient: IIngredientExtended;
  index: number;
};

const ConstructorIngredient: FC<TConstructorIngredient> = (props) => {
  const { ingredient, index } = props;
  const dispatch = useDispatch();
  const removeConstructorIngredient = (id: string) => {
    dispatch({
      type: DELETE_INGREDIENT,
      id: id,
    });
  };

  const ref = useRef<HTMLLIElement>(null) as MutableRefObject<HTMLLIElement>;

  const [handlerId, drop] = useDrop<IIngredientExtended>({
    accept: "draggedIngredient",
    collect(monitor: DropTargetMonitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: IIngredientExtended, monitor: DropTargetMonitor) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      if (clientOffset) {
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

        dispatch({
          type: REARRANGE_INGREDIENTS,
          fromIndex: dragIndex ?? index,
          toIndex: hoverIndex,
        });

        item.index = hoverIndex;
      }
    },
  });

  const [{ opacity }, drag] = useDrag({
    type: "draggedIngredient",
    item: () => {
      return { ingredient, index };
    },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.3 : 1,
    }),
  });

  drag(drop(ref));

  return (
    <li ref={ref} className={`${styles.item} mb-4`} style={{ opacity }} data-handler-id={handlerId}>
      <DragIcon type="primary" />
      <i className="ml-2" />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => removeConstructorIngredient(ingredient._uuid)}
      />
    </li>
  );
};

export default React.memo(ConstructorIngredient);
