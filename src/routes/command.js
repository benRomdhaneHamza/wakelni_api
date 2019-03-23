import CommandController from '@/controllers/command'
import MealsController from '@/controllers/meal'
import express from 'express';
import Authentication from "@/middelwares/authentication";

const router = express.Router();

// ******************************************************
// PASS COMMAND
// ******************************************************

// TODO BODY VALIDATION
router.post('/', Authentication(), async(req, res) => {
	console.log('11111111');
	const user = res.locals.user._id;
	const space = req.body.space;
	const mealListIds = req.body.meals;
	// GET MEALS OBJECT ********************
	let meals = []
	mealListIds.forEach(element => {
		meals.push(MealsController.getMealById(element));
	});
	console.log('222222');
	const mealsObjects = await Promise.all(meals);
	console.log('33333');
	// ******************************************************
	const command = await CommandController.passCommand(user, space, mealsObjects);
	console.log('444444');
	if (!command) return res.status(404).send({ errorCommand: true });
	return res.status(200).send(command);
});

export default router;