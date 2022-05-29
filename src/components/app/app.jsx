import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory, useLocation } from 'react-router-dom';
import ProtectedRoute from '../protected-route/protected-route';

import AppHeader from '../app-header/app-header';
import IngredientDetails from '../ingredient-details/ingredient-details';

import Modal from '../modal/modal';
import { useSelector, useDispatch } from 'react-redux';
import { MainPage, LoginPage, ProfilePage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, NotFound404 } from '../../pages';

import { CLOSE_MODAL } from '../../services/actions/modal';
import { CURRENT_VIEWED_INGREDIENT } from '../../services/actions/ingredients';
import { DELETE_ORDER } from '../../services/actions/order';
import { updateTokenEnhancer, getUserEnhancer } from '../../services/actions/user';
import styles from './app.module.css';

function App() {
  const ModalSwitch = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    let background = (history.action === 'PUSH' || history.action === 'REPLACE') && location.state && location.state.background;
    const { currentViewedIngredient } = useSelector(store => store.ingredients);
    const closeModal = () => {
      dispatch({
        type: CLOSE_MODAL
      })
      dispatch({
        type: DELETE_ORDER
      })
      currentViewedIngredient && dispatch({
        type: CURRENT_VIEWED_INGREDIENT,
        item: null
      })
      history.replace({ pathname: '/' })
    }

    //Доработки по ревью
    const { isLogin, resetPasswordFailed, resetPasswordMessage, setNewPasswordFailed, setNewPasswordMessage } = useSelector(store => store.user);
    const isAccessTokenExist = document.cookie.indexOf('accessToken=') !== -1;
    const isRefreshTokenExist = document.cookie.indexOf('refreshToken=') !== -1;
    
    useEffect(() => {
      if (!isAccessTokenExist && isRefreshTokenExist) {
        dispatch(updateTokenEnhancer());
      }
      if (isAccessTokenExist && isRefreshTokenExist) {
        dispatch(getUserEnhancer());
      }
    }, [dispatch, isAccessTokenExist, isRefreshTokenExist]);

    return (
      <div className={styles.app}>
        <AppHeader />

        <Switch location={background || location}>
          <Route path="/" exact={true}>
            <MainPage />
          </Route>
          <Route path='/ingredients/:id' exact={true}>
            <IngredientDetails title='Детали ингредиента'/>
          </Route>
          <ProtectedRoute
            path="/login"
            redirectСondition={isLogin}
            redirectPath='/'
          >
            <LoginPage />
          </ProtectedRoute>
          <ProtectedRoute
            path="/register"
            redirectСondition={isLogin}
            redirectPath='/'
          >
            <RegisterPage />
          </ProtectedRoute>
          <ProtectedRoute
            path="/forgot-password"
            redirectСondition={isLogin ? true : (!resetPasswordFailed && resetPasswordMessage)}
            redirectPath={isLogin ? '/' : '/reset-password'}
          >
            <ForgotPasswordPage />
          </ProtectedRoute>
          <ProtectedRoute
            path="/reset-password"
            redirectСondition={isLogin ? true : ((!setNewPasswordFailed && setNewPasswordMessage) || !resetPasswordMessage)}
            redirectPath={isLogin ? '/' : '/login'}
          >
            <ResetPasswordPage />
          </ProtectedRoute>
          <ProtectedRoute
            path="/profile"
            redirectСondition={!isLogin}
            redirectPath='/login'
          >
            <ProfilePage />
          </ProtectedRoute>
          <Route>
            <NotFound404 />
          </Route>
        </Switch>

        {background && (
          <Route
            path='/ingredients/:id'
            children={
              <Modal onClose={closeModal} title="Детали ингредиента">
                <IngredientDetails />
              </Modal>
            }>
          </Route>
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