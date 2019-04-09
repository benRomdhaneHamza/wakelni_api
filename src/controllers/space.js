import Space from '@/models/space';

class SpaceController {
	static findSpaceByAdmin(_admin) {
		return new Promise((resolve, reject) => {
			Space.findOne({ admin: _admin })
			.exec().then(resolve).catch(reject);
		});		
	}
	static verifySpaceByAdmin(_space, _user) {
		return new Promise((resolve, reject) => {
			Space.findById(_space).exec().then(space => {
				if (String(space.admin) != String(_user)) return resolve(null);
				return resolve(true);
			});
		});
	}
}
export default SpaceController;