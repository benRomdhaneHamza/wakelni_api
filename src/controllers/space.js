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
	static getSpaceById(_id) {
		return new Promise((resolve, reject) => {
			Space.findById(_id).exec().then(resolve).catch(reject);
		})
	}

	static getSpaces(_req) {
		return new Promise((resolve, reject) => {
			Space.find(_req).exec().then(resolve).catch(reject);
		});
	};

	static addSpace(spaceData) {
		return new Promise((resolve, reject) => {
			let newSpace = new Space({
				admin: spaceData.admin,
				name: spaceData.name,
				description: spaceData.description,
				city: spaceData.city,
				phone: spaceData.phone,
			});
			newSpace.save().then(resolve).catch(reject);
		});
	}

	static formatImage(_uploadedImage) {
		return {
			secure_url: _uploadedImage.secure_url,
			url: _uploadedImage.url,
			resource_type: _uploadedImage.resource_type,
			format: _uploadedImage.format,
			height: _uploadedImage.height,
			width: _uploadedImage.width,
			signature: _uploadedImage.signature,
			version: _uploadedImage.version,
			public_id: _uploadedImage.public_id
		}
	}
}
export default SpaceController;

