import { memo, useState, useCallback, SyntheticEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserEnhancer } from "../../services/actions/user";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { TUser } from "../../utils/types";

import styles from "./user-profile.module.css";

const UserProfile = () => {
  const dispatch = useDispatch();

  const { userData } = useSelector((store: any) => store.user);
  const [values, setValues] = useState<TUser>({
    name: userData ? userData.name : "",
    email: userData ? userData.email : "",
    password: "",
  });

  const [isFormChange, setIsFormChange] = useState<boolean>(false);

  const handleChange = useCallback(
    (event: { target: { name: string; value: string } }) => {
      setIsFormChange(true);
      setValues((values) => {
        return { ...values, [event.target.name]: event.target.value };
      });
    },
    []
  );

  const handleOnSubmit = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      dispatch(
        updateUserEnhancer(values.name, values.email, values.password) as any
      );
      setIsFormChange(false);
      setValues({ ...values, password: "" });
    },
    [dispatch, values]
  );

  const handleCancel = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      setIsFormChange(false);
      setValues((values) => {
        return { ...values, name: userData.name, email: userData.email };
      });
    },
    [userData.name, userData.email]
  );

  return (
    <form className={`${styles.container} text`} onSubmit={handleOnSubmit}>
      <Input
        type={"text"}
        placeholder={"Имя"}
        name={"name"}
        icon={"EditIcon"}
        size={"default"}
        value={values.name || ""}
        onChange={handleChange}
      />

      <div className="mt-6 mb-6">
        <Input
          type={"text"}
          placeholder={"Логин"}
          name={"email"}
          icon={"EditIcon"}
          size={"default"}
          value={values.email || ""}
          onChange={handleChange}
        />
      </div>
      <Input
        type={"password"}
        placeholder={"Пароль"}
        name={"password"}
        icon={"EditIcon"}
        size={"default"}
        value={values.password || ""}
        onChange={handleChange}
      />
      <section
        className="mt-6"
        style={{ visibility: isFormChange ? "visible" : "hidden" }}
      >
        <Button
          type="secondary"
          size="medium"
          name="cancel"
          onClick={handleCancel}
        >
          Отмена
        </Button>
        <Button type="primary" size="medium" name="save">
          Сохранить
        </Button>
      </section>
    </form>
  );
};

export default memo(UserProfile);
