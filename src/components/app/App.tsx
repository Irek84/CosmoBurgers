import './App.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import {dataBurger} from '../../utils/data';

function App() {
  return (
    <div className="App">
      <AppHeader/>
      <main>
        <div className="main-content">
        <BurgerIngredients data={dataBurger}/>
        <BurgerConstructor data={dataBurger}/>
        </div>

      </main>
    </div>
  );
}

export default App;
