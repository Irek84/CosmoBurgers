import styles from './ingredient-details.module.css';
import { useSelector } from 'react-redux';

const NutritionFact = (props)=>{
	return(
		<li>
			{props.name}
			<span  className="text text_type_digits-default">{props.fact}</span>
		</li>
	)
}

const IngredientDetails = () => {
	const { currentViewedIngredient } = useSelector(store => store.ingredients)
	return (
		<section className={styles.component}>
			<img src={currentViewedIngredient.image_large} alt={currentViewedIngredient.name}/>
			<div className="text text_type_main-medium mt-4 mb-8">{currentViewedIngredient.name}</div>
			<ul className="text text_type_main-default text_color_inactive mb-15">
				<NutritionFact name="Калории,ккал" fact={currentViewedIngredient.calories}/>
				<NutritionFact name="Белки, г" fact={currentViewedIngredient.proteins}/>
				<NutritionFact name="Жиры, г" fact={currentViewedIngredient.fat}/>
				<NutritionFact name="Углеводы, г" fact={currentViewedIngredient.carbohydrates}/>
			</ul>
		</section>
	)
}

export default IngredientDetails;