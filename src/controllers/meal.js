import Meal from '@/models/meal';

class MealController {

	static getMealById(_mealId) {
		return new Promise((resolve, reject) => {
			Meal.findById(_mealId).exec().then(resolve).catch(reject);
		});
	};

	static getMeals(_req) {
		return new Promise((resolve, reject) => {
			Meal.find(_req).exec().then(resolve).catch(reject);
		});
	};

	static addMeal(mealData) {
		return new Promise((resolve, reject) => {
			let newMeal = new Meal({
				space: mealData.space,
				name: mealData.name,
				description: mealData.description,
				price: mealData.price,
				image: mealData.image ||  undefined,
				available: mealData.available || undefined
			});
			newMeal.save().then(resolve).catch(reject);
		});
	}

	static formatImage(_uploadedImage) {
		return {
			secure_url: _uploadedImage.secure_url,
			url: _uploadedImage.url,
			resource_type: _uploadedImage.resource_type,
			format: _uploadedImage.format,
			height: _uploadedImage.height,
			width: _uploadedImage.width,
			signature: _uploadedImage.signature,
			version: _uploadedImage.version,
			public_id: _uploadedImage.public_id
		}
	}
}

export default MealController;