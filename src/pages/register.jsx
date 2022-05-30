import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { registerUserEnhancer } from "../services/actions/user";

import styles from "./page.module.css";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({});

  const handleChange = (event) => {
    setValues((values) => {
      return { ...values, [event.target.name]: event.target.value };
    });
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    dispatch(registerUserEnhancer(values.email, values.password, values.name));
  };

  return (
    <form className={styles.main} onSubmit={handleOnSubmit}>
      <section className={styles.container}>
        <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
        <div className={styles.input}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            name={"name"}
            size={"default"}
            onChange={handleChange}
            value={values.name || ""}
          />
        </div>
        <div className={`${styles.input} mb-6 mt-6`}>
          <Input
            type={"email"}
            placeholder={"E-mail"}
            name={"email"}
            size={"default"}
            onChange={handleChange}
            value={values.email || ""}
          />
        </div>

        <PasswordInput
          placeholder={"Пароль"}
          name={"password"}
          onChange={handleChange}
          value={values.password || ""}
        />

        <div className="mt-6 mb-20">
          <Button type="primary" size="medium">
            Зарегистрироваться
          </Button>
        </div>
        <section className={styles.questions}>
          <p className="text text_type_main-default text_color_inactive">
            <span>Уже зарегистрированы? </span>
            <Link to="/login">Войти</Link>
          </p>
        </section>
      </section>
    </form>
  );
};

export default RegisterPage;
