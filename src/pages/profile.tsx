import { useDispatch } from "../services/hooks";
import {
  NavLink,
  Switch,
  Route,
  useRouteMatch,
  useLocation,
} from "react-router-dom";
import UserProfile from "../components/user-profile/user-profile";
import OrderHistory from "../components/order-history/order-history";

import { logoutUserEnhancer } from "../services/actions/user";

import styles from "./profile.module.css";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { path, url } = useRouteMatch();
  const pathname: string = useLocation().pathname;

  const onLogout = () => {
    dispatch(logoutUserEnhancer());
  };

  return (
    <main>
      <section className={styles.section}>
        <div>
          <ul className="mt-30">
            <li>
              <NavLink
                to={{ pathname: "/profile" }}
                activeClassName={styles.activeNavItem}
              >
                <span
                  className={`text text_type_main-medium ${
                    pathname !== "/profile" && "text_color_inactive"
                  }`}
                >
                  Профиль
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={{ pathname: `${url}/orders` }}
                activeClassName={styles.activeNavItem}
              >
                <span
                  className={`text text_type_main-medium ${
                    pathname !== "/profile/orders" && "text_color_inactive"
                  }`}
                >
                  История заказов
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/login"
                exact
                className={styles.profileLink}
                activeClassName={styles.activeNavItem}
                onClick={onLogout}
              >
                <p className="text text_type_main-medium mt-6 text_color_inactive cursor_pointer">
                  Выход
                </p>
              </NavLink>
            </li>
          </ul>
          <p className="text text_type_main-default text_color_inactive mt-20">
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
        <div className="mt-30">
          <Switch>
            <Route path={path} exact>
              <UserProfile />
            </Route>
            <Route path={`${path}/orders`} exact>
              <OrderHistory />
            </Route>
          </Switch>
        </div>
      </section>
    </main>
  );
};

export default ProfilePage;
