import Address from '@/models/address';
import User from '@/models/user';
class AddressController {


    static addUserAddress(addressData,user) {
        return new Promise((resolve, reject) => {
            let address = new Address({
                description: addressData.description,
                lat: addressData.lat,
                lng: addressData.lng,
                city: addressData.city,
                
            });
            
            address.save().then((_addressAux) => {
                user.address = user.address.concat([_addressAux]);
                user.save().then((_user) =>{
                    return resolve(this.getUserWithPosts(_user.id));
                }).catch(reject);

                
            }).catch(reject); 

            
        });
    }
    static getUserWithPosts(id) {
        return User.findById(id)
        .populate('address').exec((err, posts) => {
            //console.log("Populated User " + posts);
        })
}
}
export default AddressController;

