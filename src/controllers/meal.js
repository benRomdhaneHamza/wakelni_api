import Meal from '@/models/meal';

class MealController {

	static getMealById(_mealId) {
		return new Promise((resolve, reject) => {
			Meal.findById(_mealId).exec().then(resolve).catch(reject);
		});
	};
}

export default MealController;