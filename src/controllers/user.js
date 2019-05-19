import User from '@/models/user';
import bcrypt from 'bcrypt';

class userController {

	static findById(_userId) {
		return new Promise((resolve, reject) => {
			User.findById(_userId)
			.exec().then(_user => {
				if (!_user) return resolve(null);
				return resolve(_user);
			}).catch(reject);
		});
	}

	static checkIfUserExists(_email) {
		return new Promise((resolve, reject) => {
			User.findOne({ email: _email}).exec().then(_user => {
				if (_user) return resolve(true);
				return resolve(null);
			}).catch(reject);
		});
	}

	static addUser(_user) {
		return new Promise((resolve, reject) => {
			const hashedPassword = bcrypt.hashSync(_user.password, 10);
			_user.password = hashedPassword;
			const toAddUser = new User(_user);
			console.log('toAddUser', toAddUser);
			toAddUser.save().then((_savedUser) => {
				if (!_savedUser) return resolve(null);
				_savedUser.password = undefined;
				resolve(_savedUser);
			}).catch(reject);
		});
	}

	static updateUser(newUser) {
		return new Promise((resolve, reject) => {
			//const hashedPassword = bcrypt.hashSync(_user.password, 10);
			//_user.password = hashedPassword;
			newUser.save().then((_savedUser) => {
				if (!_savedUser) return resolve(null);
				_savedUser.password = undefined;
				return resolve(_savedUser);
			}).catch(err =>{ return reject(err)});
		});
	}

	static login(_credentials) {
		return new Promise((resolve, reject) => {
			User.findOne({ email: _credentials.email}).populate('address')
			.then(_foundUser => {
				if (!_foundUser) return resolve(null);
				const verifyPassword = bcrypt.compareSync(_credentials.password, _foundUser.password);
				if (!verifyPassword) return resolve(null);
				_foundUser.password = undefined;
				return resolve(_foundUser);
			}).catch(reject);
		});
	}

	static setFcmToken(_token, _user) {
		return new Promise(async (resolve, reject) => {
			const user = await User.findById(_user);
			user.fcmToken = _token;
			user.save().then(resolve).catch(reject);
		});
	}

	static loginSpace(_credentials) {
		return new Promise((resolve, reject) => {
			User.findOne({ email: _credentials.email}).exec().then(_foundUser => {
				if (!_foundUser) return resolve(null);
				if (!_foundUser.hasSpace) return resolve(null);
				const verifyPassword = bcrypt.compareSync(_credentials.password, _foundUser.password);
				if (!verifyPassword) return resolve(null);
				_foundUser.password = undefined;
				return resolve(_foundUser);
			}).catch(reject);
		});
	}
}

export default userController;