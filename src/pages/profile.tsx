import { useDispatch, useSelector } from "../services/hooks";
import { NavLink, Switch, Route, useRouteMatch, useLocation } from "react-router-dom";
import UserProfile from "../components/user-profile/user-profile";
import OrderHistory from "../components/orders-history/orders-history";
import ProtectedRoute from "../components/protected-route/protected-route";

import { logoutUserEnhancer } from "../services/actions/user";

import styles from "./profile.module.css";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { path, url } = useRouteMatch();
  const pathname: string = useLocation().pathname;

  const onLogout = () => {
    dispatch(logoutUserEnhancer());
  };

  const { isAuthenthicated } = useSelector((store) => store.user);

  return (
    <main>
      <section className={styles.section}>
        <div className={styles.menu}>
          <ul className="mt-30">
            <li>
              <NavLink to={{ pathname: "/profile" }} activeClassName={styles.activeNavItem}>
                <span className={`text text_type_main-medium ${pathname !== "/profile" && "text_color_inactive"}`}>Профиль</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={{ pathname: `${url}/orders` }} activeClassName={styles.activeNavItem}>
                <span className={`text text_type_main-medium ${pathname !== "/profile/orders" && "text_color_inactive"}`}>История заказов</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" exact className={styles.profileLink} activeClassName={styles.activeNavItem} onClick={onLogout}>
                <p className="text text_type_main-medium mt-6 text_color_inactive cursor_pointer">Выход</p>
              </NavLink>
            </li>
          </ul>
          {pathname == "/profile" && (
            <p className="text text_type_main-default text_color_inactive mt-20">В этом разделе вы можете изменить свои персональные данные</p>
          )}
          {pathname == "/profile/orders" && (
            <p className="text text_type_main-default text_color_inactive mt-20">В этом разделе вы можете просмотреть свою историю заказов</p>
          )}
        </div>
        <div className="mt-30">
          <Switch>
            <ProtectedRoute path={path} isRedirect={!isAuthenthicated} redirectPath="/login" exact={true}>
              <UserProfile />
            </ProtectedRoute>
            <ProtectedRoute path={`${path}/orders`} isRedirect={!isAuthenthicated} redirectPath="/login" exact={true}>
              <OrderHistory />
            </ProtectedRoute>
          </Switch>
        </div>
      </section>
    </main>
  );
};

export default ProfilePage;
