import Address from '@/models/address';
import User from '@/models/user';
import Space from '@/models/space';
class AddressController {


	static addUserAddress(addressData, user) {
		return new Promise((resolve, reject) => {
			let address = new Address({
				description: addressData.description,
				lat: addressData.lat,
				lng: addressData.lng,
				city: addressData.city,
			});
			address.save().then((_addressAux) => {
				user.address = user.address.concat([_addressAux]);
				user.save().then((_user) => {
					return resolve(this.getUserWithPosts(_user.id));
				}).catch(reject);
			}).catch(reject);
		});
	}

	static addAddressToSpace(_address, _spaceId) {
		return new Promise(async (resolve, reject) => {
			let address = new Address({
				description: _address.description || '',
				label: _address.label,
				lat: _address.lat,
				lng: _address.lng,
				city: _address.city || '',
				number: _address.number || '',
				street: _address.street || '',
			});
			const savedAddress = await address.save();
			if (!savedAddress) return reject(null);
			const space = await Space.findById(_spaceId);
			if (!space) return reject(null);
			space.address = savedAddress._id;
			const savedSpace = await space.save();
			await savedSpace.populate('address')
			return resolve(savedSpace);
		})
	}
	static getUserWithPosts(id) {
		return User.findById(id)
			.populate('address').exec((err, posts) => {
				//console.log("Populated User " + posts);
			})
	}

	static deleteAddress(_addressId) {
		return new Promise((resolve, reject) => {
			Address.findByIdAndRemove(_addressId).exec().then((_res) => {
				return resolve(true);
			}).catch(reject);
		});
	}
}
export default AddressController;

