import { memo, FC } from "react";
import styles from "./ui.module.css";

const getDaysCount = (days: number) => {
  let lastDigit = days % 10;
  return lastDigit === 0 ? "Сегодня" : lastDigit === 1 ? "Вчера" : lastDigit > 1 && lastDigit < 5 ? `${lastDigit} дня назад` : `${lastDigit} дней назад`;
};

export const getDateFormatted = (date: Date) => {
  const dayCreated: Date = new Date(date);
  const today: Date = new Date();
  today.setHours(0, 0, 0, 0);
  const diffDays: number = Math.ceil((today.getTime() - dayCreated.getTime()) / (60 * 60 * 24 * 1000));
  const hours = dayCreated.getHours() > 9 ? dayCreated.getHours() : `0${dayCreated.getHours()}`;
  const min = dayCreated.getMinutes() > 9 ? dayCreated.getMinutes() : `0${dayCreated.getMinutes()}`;

  return `${getDaysCount(diffDays)}, ${hours}:${min} i-GMT+${(dayCreated.getTimezoneOffset() * -1) / 60}`;
};

type TDateTitleProps = {
  date: Date;
}
const DateTitle: FC<TDateTitleProps> = (props) => {
  const dateFormatted = getDateFormatted(props.date);
  return <span className={"text text_type_main-default text_color_inactive"}>{dateFormatted}</span>;
};

export default memo(DateTitle);
