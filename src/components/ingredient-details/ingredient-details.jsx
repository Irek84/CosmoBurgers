import styles from './ingredient-details.module.css';
import React, { memo, useEffect, useState } from 'react';
import { getIngredients } from '../../utils/api';
import { useParams } from "react-router-dom";
import PropTypes from 'prop-types';

const NutritionFact = (props) => {
	return (
		<li>
			{props.name}
			<span className="text text_type_digits-default">{props.fact}</span>
		</li>
	)
}

const IngredientDetails = (props) => {

	const [currentViewedIngredient, setCurrentViewedIngredient] = useState({
		image_large: '',
		name: '',
		calories: '',
		proteins: '',
		fat: '',
		carbohydrates: '',
		isLoading: false
	})

	let { id } = useParams();

	useEffect(() => {
		setCurrentViewedIngredient((currentViewedIngredient) => {
			return {
				...currentViewedIngredient,
				isLoading: true,
			};
		});
		getIngredients().then((data) => {
			const ingredient = data.find((el) => el._id === id)
			setCurrentViewedIngredient({
				image_large: ingredient.image_large,
				name: ingredient.name,
				calories: ingredient.calories,
				proteins: ingredient.proteins,
				fat: ingredient.fat,
				carbohydrates: ingredient.carbohydrates,
				isLoading: false,
			})
		}).catch((err) => {
			console.error(err)
			setCurrentViewedIngredient((currentViewedIngredient) => {
				return {
					...currentViewedIngredient,
					isLoading: false,
				}
			})
		})

	}, [id]);

	return (
		<section className={styles.component}>
			<h1 className="mt-10 pt-3 text text_type_main-large">{props.title}</h1>
			<img src={currentViewedIngredient.image_large} alt={currentViewedIngredient.name} />
			<div className="text text_type_main-medium mt-4 mb-8">{currentViewedIngredient.name}</div>
			<ul className="text text_type_main-default text_color_inactive mb-15">
				<NutritionFact name="Калории,ккал" fact={currentViewedIngredient.calories} />
				<NutritionFact name="Белки, г" fact={currentViewedIngredient.proteins} />
				<NutritionFact name="Жиры, г" fact={currentViewedIngredient.fat} />
				<NutritionFact name="Углеводы, г" fact={currentViewedIngredient.carbohydrates} />
			</ul>
		</section>
	)
}

export default memo(IngredientDetails);

IngredientDetails.propTypes = {
	title: PropTypes.string
};