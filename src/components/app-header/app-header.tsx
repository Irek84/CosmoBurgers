import React, { useEffect, useState } from "react";
import { NavLink, useRouteMatch } from "react-router-dom";
import { useSelector } from "../../services/hooks";
import styles from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const AppHeader = () => {
  const { userData } = useSelector((store) => store.user);
  const [userName, setUserName] = useState<string>("Личный кабинет");
  useEffect(() => {
    const isUserNameExist: boolean = userData.name !== "";
    setUserName(isUserNameExist ? userData.name : "Личный кабинет");
  }, [userData]);
  const isConstructor: boolean = !!useRouteMatch({ path: "/", exact: true });
  const isFeed: boolean = !!useRouteMatch("/feed");
  const isProfile: boolean = !!useRouteMatch("/profile");
  return (
    <header>
      <nav>
        <div>
          <NavLink
            className={`pr-5 mt-4 mb-4`}
            to="/"
            activeClassName={styles.active}
            exact
          >
            <BurgerIcon type={isConstructor ? "primary" : "secondary"} />
            <span className="text text_type_main-default pl-2">
              Конструктор
            </span>
          </NavLink>
          <NavLink
            className="pr-5 pl-5 mt-4 mb-4"
            to="/feed"
            activeClassName={styles.active}
          >
            <ListIcon type={isFeed ? "primary" : "secondary"} />
            <span className="text text_type_main-default pl-2">
              Лента заказов
            </span>
          </NavLink>
        </div>
        <div>
          <NavLink
            className={`pr-5 mt-4 mb-4`}
            to="/"
            activeClassName={styles.active}
          >
            <Logo />
          </NavLink>
        </div>
        <div>
          <NavLink
            className="pr-5 pl-5 mt-4 mb-4"
            to="/profile"
            activeClassName={styles.active}
          >
            <ProfileIcon type={isProfile ? "primary" : "secondary"} />
            <span className="text text_type_main-default pl-2">{userName}</span>
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default React.memo(AppHeader);
