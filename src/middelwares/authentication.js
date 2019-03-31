import Token from '@/utils/token';
import UserController from "@/controllers/user";
export default () => {
	return async (req, res, next) => {
		let user = null;
		const token = req.headers['x-access-token'];
		if (!token) return res.status(404).send({ authenticationError: true });
		user = await Token.verifyLoginToken(token);
		if (!user) return res.status(404).send({ authenticationError: true });
		user = await UserController.findById(user._id);
		if (!user) return res.status(404).send({ authenticationError: true });
		if (user.blocked) return res.status(401).send({ blockedAcount: true });
		res.locals.user = user;
		return next();
	}
}