import UserController from '@/controllers/user'
import SpaceController from "@/controllers/space";
import express from 'express';
import Token from "@/utils/token";
import Authentication from "@/middelwares/authentication";

const router = express.Router();

router.get('/', async (req, res) => {
	res.status(201).send({ message: 'welcome to users wakelni' });
});

// ******************************************************
// USER SINGUP
// ******************************************************

// TODO BODY VALIDATION
router.post('/signup', async(req, res) => {
	const newUser = req.body;
	newUser.email = newUser.email.toLowerCase();
	const userExist = await UserController.checkIfUserExists(newUser.email);
	if (userExist) return res.status(409).send({ emailUsed: true });
	const addedUser = await UserController.addUser(newUser);
	if (!addedUser) if (userExist) return res.status(403).send({ errorSignup: true });
	// SEND CONFIRMATION MAIL
	const loginToken = Token.getLoginToken(addedUser);
	res.status(201).send({ token: loginToken, user: addedUser });
});

// ******************************************************
// USER LOGIN
// ******************************************************

// TODO BODY VALIDATION
router.post('/login', async(req, res) => {
	const user = await UserController.login(req.body);
	if (!user) return res.status(404).send({ wrongCredentials: true });
	const loginToken = Token.getLoginToken(user);
	if (!loginToken) return res.status(401).send({ loginError: true });
	res.status(200).send({ token: loginToken, user });
});

// ******************************************************
// SPACE LOGIN
// ******************************************************

router.post('/space/login', async(req, res) => {
	const user  = await UserController.loginSpace(req.body);
	if (!user) return res.status(404).send({ wrongCredentials: true });
	const space = await SpaceController.findSpaceByAdmin(user._id);
	if (!space) return res.status(404).send({ noSpaceFound: true });
	const loginToken = Token.getLoginToken(user);
	if (!loginToken) return res.status(401).send({ loginError: true });
	res.status(200).send({ token: loginToken, user, space });
})

router.get('/test', Authentication(), async(req, res) => {
	const user = res.locals.user;
	res.status(200).send(user);
})



export default router;