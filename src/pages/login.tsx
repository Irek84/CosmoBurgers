import React, { SyntheticEvent, useState } from "react";
import { useSelector, useDispatch } from "../services/hooks";
import { Link } from "react-router-dom";
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { loginUserEnhancer } from "../services/actions/user";
import { TTarget } from "../services/types";
import styles from "./page.module.css";

const LoginPage = () => {
  const dispatch = useDispatch();

  const { loginUserFailed } = useSelector((store) => store.user);
  const [values, setValues] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const handleChange = (event: TTarget) => {
    setValues((values) => {
      return { ...values, [event.target.name]: event.target.value };
    });
  };
  const handleOnSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUserEnhancer(values.email, values.password));
  };

  return (
    <form className={styles.main} onSubmit={handleOnSubmit}>
      <section className={styles.container}>
        <h1 className="text_type_main-medium mb-6">Вход</h1>
        <div className="mb-6">
          <Input type={"email"} placeholder={"E-mail"} name={"email"} size={"default"} onChange={handleChange} value={values.email || ""} />
        </div>
        <div className="mb-6">
          <PasswordInput name={"password"} onChange={handleChange} value={values.password || ""} />
        </div>

        <Button type="primary" size="medium" name="loginButton">
          Войти
        </Button>
        <span className={`${styles.error} text text_type_main-default mb-6 mt-6`} style={{ visibility: loginUserFailed ? "visible" : "hidden" }}>
          Неправильный логин или пароль
        </span>
        <p className="text text_type_main-default text_color_inactive mb-4 mt-20">
          <span>Вы — новый пользователь? </span>
          <Link to="/register">Зарегистрироваться</Link>
        </p>
        <p className="text text_type_main-default text_color_inactive">
          <span>Забыли пароль? </span>
          <Link to="/forgot-password">Восстановить пароль</Link>
        </p>
      </section>
    </form>
  );
};

export default LoginPage;
