import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import {dataBurger} from './utils/data';

function App() {
  return (
    <div className="App">
      <AppHeader/>
      <div className='main'>
        <BurgerIngredients data={dataBurger}/>
        <BurgerConstructor data={dataBurger}/>
      </div>
    </div>
  );
}

export default App;
