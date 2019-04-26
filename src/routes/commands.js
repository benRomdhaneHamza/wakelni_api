import CommandController from '@/controllers/command';
import MealsController from '@/controllers/meal';
import SpaceController from '@/controllers/space';
import NotificationController from "@/controllers/notifications";
import express from 'express';
import Authentication from "@/middelwares/authentication";;

const router = express.Router();

// ******************************************************
// PASS COMMAND
// ******************************************************

// TODO BODY VALIDATION
// TODO VERIFY COMMAND FROM ONE SPACE
router.post('/', Authentication(), async (req, res) => {
	const user = res.locals.user._id;
	const spaceId = req.body.space;
	const mealListIds = req.body.meals;
	const description = req.body.description;
	// GET MEALS OBJECT ********************
	let meals = []
	mealListIds.forEach(element => {
		meals.push(MealsController.getMealById(element));
	});
	const mealsObjects = await Promise.all(meals);
	// ******************************************************
	const command = await CommandController.passCommand(user, spaceId, mealsObjects, description);
	if (!command) return res.status(404).send({ errorCommand: true });
	const space = await SpaceController.getSpaceById(spaceId);
	let notification = {
		command: command._id
	}
	NotificationController.sendNotifiaction(space.admin, user, notification, 'NC');
	return res.status(200).send(command);
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

// ******************************************************
// CHANGE COMMAND STATE
// ******************************************************
// TODO : VERIFY BODY AND AUTHORIZATION
router.put('/:_id/state', Authentication(), async(req, res) => {
	const state = req.query.state;
	const commandId = req.params._id;
	const updatedCommand = await CommandController.changeState(commandId, state);
	if (!updatedCommand) return res.status(404).send({ stateError: true });
	const space = await SpaceController.getSpaceById(updatedCommand.space);
	let notification = {
		command: updatedCommand._id,
		space: space.name
	}
	let notifType = null;
	if (state == 'ACCEPTED') notifType = 'AC';
	else if (state == 'REJECTED') notifType = 'RC';
	NotificationController.sendNotifiaction(updatedCommand.user, null, notification, notifType);
	return res.status(200).send(updatedCommand);
	
});

// ******************************************************
// UPDATE COMMAND
// ******************************************************
// router.put('/', Authentication(), async (req, res) => {
// 	const user = res.locals.user;
// 	const commandId = req.body.command;
// 	const mealListIds = req.body.meals
// 	const command = await CommandController.getCommand(commandId);
// 	if (String(command.user) != String(user._id)) return res.status(401).send({ unothorized: true });
// 	if (command.state != 'PASSED') return res.status(401).send({ unothorized: true });
// 	// GET MEALS OBJECT ********************
// 	let meals = []
// 	mealListIds.forEach(element => {
// 		meals.push(MealsController.getMealById(element));
// 	});
// 	const mealsObjects = await Promise.all(meals);
// 	// ******************************************************
// 	const updatedCommand = await CommandController.updateCommand(commandId, mealsObjects);
// 	if (!updatedCommand) return res.status(404).send({ errorCommand: true });
// 	return res.status(200).send(updatedCommand);
// });

export default router;