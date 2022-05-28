import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory, useLocation } from 'react-router-dom';
import ProtectedRoute from '../protected-route/protected-route';

import AppHeader from '../app-header/app-header';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import { useSelector,useDispatch } from 'react-redux';
import { MainPage, LoginPage, ProfilePage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, NotFound404} from '../../pages';

import { CLOSE_MODAL } from '../../services/actions/modal';
import { CURRENT_VIEWED_INGREDIENT } from '../../services/actions/ingredients';
import { DELETE_ORDER } from '../../services/actions/order';
import styles from './app.module.css';

function App() {
  const ModalSwitch = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
//    const background = location.state && location.state.background;
    let background = (history.action === 'PUSH' || history.action === 'REPLACE') && location.state && location.state.background;
    const { currentViewedIngredient} = useSelector(store => store.ingredients);
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
      history.replace({ pathname: '/'})
    }

    return (
      <div className={styles.app}>
        <AppHeader />

        <Switch location={background || location}>
          <Route path="/" exact={true}>
            <MainPage />
          </Route>
          <Route path='/ingredients/:id' exact={true}>
            <IngredientDetails />
          </Route>
          <Route path="/login" exact={true}>
            <LoginPage />
          </Route>
          <Route path="/register" exact={true}>
            <RegisterPage />
          </Route>
          <Route path="/forgot-password" exact={true}>
            <ForgotPasswordPage />
          </Route>
          <Route path="/reset-password" exact={true}>
            <ResetPasswordPage />
          </Route>
          <ProtectedRoute path="/profile">
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
              <Modal onClose={closeModal}>
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