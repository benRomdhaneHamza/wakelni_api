import UserController from '@/controllers/user'
import SpaceController from "@/controllers/space";
import express from 'express';
import Token from "@/utils/token";
import Authentication from "@/middelwares/authentication";
import User from '@/models/user';


const router = express.Router();

router.get('/', async (req, res) => {
	res.status(201).send({ message: 'welcome to users wakelni' });
});

// ******************************************************
// USER SINGUP
// ******************************************************

// TODO BODY VALIDATION
router.post('/signup', async (req, res) => {
	const newUser = req.body;
	newUser.email = newUser.email.toLowerCase();
	const userExist = await UserController.checkIfUserExists(newUser.email);
	if (userExist) return res.status(409).send({ emailUsed: true });
	const addedUser = await UserController.addUser(newUser);
	if (!addedUser) return res.status(403).send({ errorSignup: true });
	// SEND CONFIRMATION MAIL
	const loginToken = Token.getLoginToken(addedUser);
	res.status(201).send({ token: loginToken, user: addedUser });
});

// ******************************************************
// USER UPDATE
// ******************************************************

// TODO BODY VALIDATION
router.put('/:id', async(req, res) => {
	// let user = await UserController.findById(req.params.id)
	let user = await User.findById(req.params.id)
	if (!user) res.status(404).send({ userNotFound: true });
	user.firstname = req.body.firstname
	user.lastname = req.body.lastname
	user.email = req.body.email
	user.address = req.body.address
	
	let userUpdated = await UserController.updateUser(user)
	res.status(200).send(userUpdated)
});
// ******************************************************
// USER LOGIN
// ******************************************************

// TODO BODY VALIDATION
router.post('/login', async (req, res) => {
	const user = await UserController.login(req.body);
	if (!user) return res.status(404).send({ wrongCredentials: true });
	if (user.hasSpace) return res.status(404).send({ adminAcount: true });
	const loginToken = Token.getLoginToken(user);
	if (!loginToken) return res.status(401).send({ loginError: true });
	res.status(200).send({ token: loginToken, user });
});

// ******************************************************
// USER SET FCM TOKEN
// ******************************************************

router.post('/fcmToken', Authentication(), async (req, res) => {
	const user = res.locals.user;
	const fcmToken = req.body.token;
	const updatedUser = await UserController.setFcmToken(fcmToken, user._id);
	if (updatedUser) return res.status(200).send({ fcmTokenSuccess: true });
	return res.status(401).send({ fcmTokenError: true });
});

// ******************************************************
// SPACE LOGIN
// ******************************************************

router.post('/space/login', async (req, res) => {
	const user = await UserController.loginSpace(req.body);
	if (!user) return res.status(404).send({ wrongCredentials: true });
	const space = await SpaceController.findSpaceByAdmin(user._id);
	if (!space) return res.status(404).send({ noSpaceFound: true });
	const loginToken = Token.getLoginToken(user);
	if (!loginToken) return res.status(401).send({ loginError: true });
	res.status(200).send({ token: loginToken, user, space });
})

router.get('/test', async (req, res) => {
	const date = new Date();
	let code  = date.valueOf().toString();
	console.log(code);
	console.log(code.substr(code.length-4, 4));
	console.log('---------------------');
	res.status(200).send('ok');
})



export default router;