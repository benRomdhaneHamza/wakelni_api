import jwt from 'jsonwebtoken';

class Token {
	static getLoginToken(data) {
		const loginToken = jwt.sign({
			_id: data._id, email: data.email
		}, process.env.JWTSECRET, { expiresIn: '30d' });
		return loginToken;
	}

	static verifyLoginToken(_token) {
		return new Promise((resolve, reject) => {
			jwt.verify(_token, process.env.JWTSECRET, (_err, decoded) => {
				if (_err) return resolve(null);
				return resolve(decoded);
			});
		});
	}
}

export default Token;