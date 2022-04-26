import styles from './ingredient-details.module.css';
import {dataBurgerPropTypes} from '../../utils/properties';

const NutritionFact = (props)=>{
	return(
		<li>
			{props.name}
			<span  className="text text_type_digits-default">{props.fact}</span>
		</li>
	)
}

const IngredientDetails = (props) => {
	return (
		<section className={styles.component}>
			<img src={props.data.image_large} alt={props.data.name}/>
			<div className="text text_type_main-medium mt-4 mb-8">{props.data.name}</div>
			<ul className="text text_type_main-default text_color_inactive mb-15">
				<NutritionFact name="Калории,ккал" fact={props.data.calories}/>
				<NutritionFact name="Белки, г" fact={props.data.proteins}/>
				<NutritionFact name="Жиры, г" fact={props.data.fat}/>
				<NutritionFact name="Углеводы, г" fact={props.data.carbohydrates}/>
			</ul>
		</section>
	)
}

export default IngredientDetails;

IngredientDetails.propTypes = {
	data: dataBurgerPropTypes.isRequired
};