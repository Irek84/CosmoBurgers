import styles from './ingredient-details.module.css'

const NutritionFact = (props)=>{
	return(
		<div>
			{props.name}
			<span  className="text text_type_digits-default">{props.fact}</span>
		</div>
	)
}

const IngredientDetails = (props) => {
	console.log(props)
	return (
		<section className={styles.ingredient_details}>
			<img src={props.data.image_large} className=""/>
			<div className="text text_type_main-medium mt-4 mb-8">{props.data.name}</div>
			<div className={`${styles.nutrition_facts} text text_type_main-default text_color_inactive mb-15`}>
				<NutritionFact name="Калории,ккал" fact={props.data.calories}/>
				<NutritionFact name="Белки, г" fact={props.data.proteins}/>
				<NutritionFact name="Жиры, г" fact={props.data.fat}/>
				<NutritionFact name="Углеводы, г" fact={props.data.carbohydrates}/>
			</div>
		</section>
	)
}

export default IngredientDetails;