import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import ProtectedRoute from "../protected-route/protected-route";

import AppHeader from "../app-header/app-header";
import IngredientDetails from "../ingredient-details/ingredient-details";

import Modal from "../modal/modal";
import { useSelector, useDispatch } from "../../services/hooks";
import { MainPage, LoginPage, ProfilePage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, NotFound404, FeedPage, OrderInfoPage } from "../../pages";

import { CLOSE_MODAL } from "../../services/constants/modal";
import { CURRENT_VIEWED_INGREDIENT } from "../../services/constants/ingredients";
import { DELETE_ORDER } from "../../services/constants/order";
import { checkUserAuth } from "../../services/actions/user";
import { Location } from "history";
import styles from "./app.module.css";

function App() {
  const ModalSwitch = () => {
    const dispatch = useDispatch();
    const location = useLocation<{ background: Location }>();
    const history = useHistory();
    let background = location.state && location.state.background;
    const { currentViewedIngredient } = useSelector((store: { ingredients: any }) => store.ingredients);
    const closeModal = () => {
      dispatch({
        type: CLOSE_MODAL,
      });
      dispatch({
        type: DELETE_ORDER,
      });
      currentViewedIngredient &&
        dispatch({
          type: CURRENT_VIEWED_INGREDIENT,
          item: null,
        });

      history.goBack();
    };

    const { isAuthenthicated, resetPasswordFailed, resetPasswordMessage, setNewPasswordFailed, setNewPasswordMessage } = useSelector((store) => store.user);

    useEffect(() => {
      dispatch(checkUserAuth());
    }, [dispatch]);

    return (
      <div className={styles.app}>
        <AppHeader />

        <Switch location={background || location}>
          <Route path="/" exact={true}>
            <MainPage />
          </Route>
          <Route path="/ingredients/:id" exact={true}>
            <IngredientDetails title="Детали ингредиента" />
          </Route>
          <Route path="/feed" exact={true}>
            <FeedPage />
          </Route>
          <Route path="/feed/:id">
            <OrderInfoPage />
          </Route>
          <ProtectedRoute path="/login" redirectСondition={isAuthenthicated} redirectPath="/">
            <LoginPage />
          </ProtectedRoute>
          <ProtectedRoute path="/register" redirectСondition={isAuthenthicated} redirectPath="/">
            <RegisterPage />
          </ProtectedRoute>
          <ProtectedRoute
            path="/forgot-password"
            redirectСondition={isAuthenthicated ? true : !resetPasswordFailed && (resetPasswordMessage.length > 0 ? true : false)}
            redirectPath={isAuthenthicated ? "/" : "/reset-password"}
          >
            <ForgotPasswordPage />
          </ProtectedRoute>
          <ProtectedRoute
            path="/reset-password"
            redirectСondition={
              isAuthenthicated ||
              (!setNewPasswordFailed && (setNewPasswordMessage.length > 0 ? true : false)) ||
              !(resetPasswordMessage!.length > 0 ? true : false)
            }
            redirectPath={isAuthenthicated ? "/" : "/login"}
          >
            <ResetPasswordPage />
          </ProtectedRoute>
          <ProtectedRoute path="/profile" redirectСondition={!isAuthenthicated} redirectPath="/login">
            <ProfilePage />
          </ProtectedRoute>
          <Route>
            <NotFound404 />
          </Route>
        </Switch>

        {background && (
          <>
            {" "}
            <Route
              path="/ingredients/:id"
              children={
                <Modal onClose={closeModal} title="Детали ингредиента">
                  <IngredientDetails />
                </Modal>
              }
            ></Route>
            <Route
              path="/feed/:id"
              children={
                <Modal onClose={closeModal}>
                  <OrderInfoPage />
                </Modal>
              }
            />
          </>
        )}
      </div>
    );
  };
  return (
    <Router>
      <ModalSwitch />
    </Router>
  );
}

export default App;
