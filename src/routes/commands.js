import CommandController from '@/controllers/command';
import MealsController from '@/controllers/meal';
import SpaceController from '@/controllers/space';
import express from 'express';
import Authentication from "@/middelwares/authentication";;

const router = express.Router();

// ******************************************************
// PASS COMMAND
// ******************************************************

// TODO BODY VALIDATION
router.post('/', Authentication(), async (req, res) => {
	const user = res.locals.user._id;
	const space = req.body.space;
	const mealListIds = req.body.meals;
	// GET MEALS OBJECT ********************
	let meals = []
	mealListIds.forEach(element => {
		meals.push(MealsController.getMealById(element));
	});
	const mealsObjects = await Promise.all(meals);
	// ******************************************************
	// if (!CommandController.verifCommandValidity(space, mealsObjects.map(_obj => _obj._id))) 
	// 	return res.status(401).send({ unauthorized: true });
	const command = await CommandController.passCommand(user, space, mealsObjects);
	if (!command) return res.status(404).send({ errorCommand: true });
	return res.status(200).send(command);
});

// ******************************************************
// UPDATE COMMAND
// ******************************************************
router.put('/', Authentication(), async (req, res) => {
	const user = res.locals.user;
	const commandId = req.body.command;
	const mealListIds = req.body.meals
	const command = await CommandController.getCommand(commandId);
	if (String(command.user) != String(user._id)) return res.status(401).send({ unothorized: true });
	if (command.state != 'PASSED') return res.status(401).send({ unothorized: true });
	// GET MEALS OBJECT ********************
	let meals = []
	mealListIds.forEach(element => {
		meals.push(MealsController.getMealById(element));
	});
	const mealsObjects = await Promise.all(meals);
	// ******************************************************
	const updatedCommand = await CommandController.updateCommand(commandId, mealsObjects);
	if (!updatedCommand) return res.status(404).send({ errorCommand: true });
	return res.status(200).send(updatedCommand);
});

// ******************************************************
// GET BY USER
// ******************************************************
router.get('/user', Authentication(), async(req, res) => {
	const user = res.locals.user;
	const commands = await CommandController.getUserCommands(user);
	if (commands) return res.status(200).send(commands);
	return res.status(404).send({ commandsNotFound: true });
});
// ******************************************************
// GET BY SPACE
// ******************************************************
router.get('/space/:space', Authentication(), async(req, res) => {
	const user = res.locals.user;
	const space = req.params.space;
	const state = req.query.state;
	const valideSpace = await SpaceController.verifySpaceByAdmin(space, user._id)
	if (!valideSpace) return res.status(404).send({ wrongSpace: true });
	const commands = await CommandController.getCommandsBySpace(space, state);
	if (commands) return res.status(200).send(commands);
	return res.status(404).send({ commandsNotFound: true });
});

export default router;