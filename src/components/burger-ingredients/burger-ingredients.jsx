import styles from './burger-ingredients.module.css';
import {Tab, CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientDetails from '../ingredient-details/ingredient-details';
import PropTypes from 'prop-types';
import {dataBurgerPropTypes, selectedIngredientIds} from '../../utils/properties';

const BurgerIngredients = ({setModal, data}) => {    
    const handleClick = (data) => {
      setModal({
        visible: true,
        title: "Детали ингредиента",
        content: <IngredientDetails data={data}/>
      })
    }
    
    const IngredientsTypeList = ({title, data}) => {
        return (
          <>
            <div className='text text_type_main-medium mt-10'>{title}</div>
            <ul className='mr-1'>
                {data.map(ingredient=>(
                    <IngredientCard data={ingredient}  key={ingredient._id}/>
                 ))}
            </ul>
          </>          
        );
      };
      const IngredientCard = ({ data }) => {
        return (
            <li className='mt-6' onClick={()=>handleClick(data)}>
                {
                    selectedIngredientIds.filter(id=>id===data._id).length>0
                    &&
                    <Counter count={selectedIngredientIds.filter(id=>id===data._id).length}></Counter>
                }
                
                <img src={data.image} className="ml-4" alt={data.name}></img>
                <div className={`${styles.price} text text_type_digits-default mt-1 mb-1`}>{data.price}&nbsp;<CurrencyIcon/></div>
                <div className='text text_type_main-default'>{data.name}</div>
            </li>
        );
      };      
    return (
      <div className={`${styles.component} mr-10`}>
        <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
        <div className={styles.tabs}>
          <Tab value="buns" active={'buns'}>
            Булки
          </Tab>
          <Tab value="sauce">
            Соусы
          </Tab>
          <Tab value="main" >
            Начинки
          </Tab>
        </div>
        <div className={`${styles.list}`}>
          <IngredientsTypeList title="Булки" data={data.filter(ingredient=>ingredient.type==='bun')}/>
          <IngredientsTypeList title="Соусы" data={data.filter(ingredient=>ingredient.type==='sauce')}/>
          <IngredientsTypeList title="Начинки" data={data.filter(ingredient=>ingredient.type==='main')}/>
        </div>
      </div>
    );
}

export default BurgerIngredients;

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(dataBurgerPropTypes),
  setModal: PropTypes.func.isRequired
};