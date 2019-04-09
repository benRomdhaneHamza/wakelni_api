import MealsController from '@/controllers/meal'
import PictureController from '@/controllers/picture'
import express from 'express';
import Authentication from "@/middelwares/authentication";

const router = express.Router();

// ******************************************************
// GET MEALS
// ******************************************************

// TODO BODY VALIDATION
router.get('/', Authentication(), async(req, res) => {
	const query = req.query;
	const meals = await MealsController.getMeals(query ? query : null);
	res.status(200).send(meals);
});

// ******************************************************
// GET MEAL BY ID
// ******************************************************

router.get('/:id', Authentication(), async(req, res) => {
	const id = req.params.id;
	const meal = await MealsController.getMealById(id);
	res.status(200).send(meal);
});

// ******************************************************
// ADD MEALS
// ******************************************************

// TODO BODY VALIDATION
router.post('/', Authentication(), PictureController.picture_upload('/meals/').single('image'), async(req, res) => {
	const mealData = req.body;
	if (req.file) mealData.image = MealsController.formatImage(req.file);
	const addedMeal = await MealsController.addMeal(mealData);
	if (!addedMeal) return res.status(404).send({ invalidData: true });
	res.status(200).send(addedMeal);
});

export default router;