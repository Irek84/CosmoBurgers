import styles from "./order-details.module.css";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import vector1 from "../../images/vector1.svg";
import vector2 from "../../images/vector2.svg";
import vector3 from "../../images/vector3.svg";
import { FC } from "react";

type TOrderDetails = {
  orderNumber: number;
}
const OrderDetails: FC<TOrderDetails>  = (props) => {
  return (
    <section className={styles.component}>
      <h1 className="mt-20 mb-8 text text_type_digits-large">
        {props.orderNumber}
      </h1>
      <div className="text text_type_main-medium mb-15">
        идентификатор заказа
      </div>
      <div className={styles.wrapper}>
        <img src={vector1} alt="фон" />
        <img src={vector2} alt="фон" />
        <img src={vector3} alt="фон" />
        <CheckMarkIcon type={"secondary"} />
      </div>
      <div className="text text_type_main-default mt-15">
        Ваш заказ начали готовить
      </div>
      <div className="text text_type_main-default text_color_inactive mb-30 mt-2">
        Дождитесь готовности на орбитальной станции
      </div>
    </section>
  );
};

export default OrderDetails;
