import express from 'express';
import Authentication from "@/middelwares/authentication";
import AddressController from '@/controllers/address';


const router = express.Router();

// ******************************************************
// ADD ADDRESS TO USER
// ******************************************************

// TODO BODY VALIDATION
// TODO VERIFY COMMAND FROM ONE SPACE
router.post('/user/', Authentication(), async (req, res) => {
	const user = res.locals.user;
	const addressData = req.body;

	// ******************************************************
	const addedAddress = await AddressController.addUserAddress(addressData, user);
	if (!addedAddress) return res.status(404).send({ invalidData: true });
	res.status(200).send(addedAddress);
});

// ******************************************************
// ADD ADDRESS TO SPACE
// ******************************************************

// TODO BODY VALIDATION
router.post('/space/:_id', Authentication(), async (req, res) => {
	const spaceId = req.params._id;
	const address = req.body;
	const updatedSpace = await AddressController.addAddressToSpace(address, spaceId);
	if (!updatedSpace) return res.status(404).send({ invalidData: true });
	res.status(200).send(updatedSpace);
});

// ******************************************************
// Delete address
// ******************************************************

router.delete('/user/:addressId', Authentication(), async(req, res) => {
	const addressId = req.params.addressId;
	const user = res.locals.user;
	const index = user.address.findIndex(element => element === addressId);
	if (!index) res.status(404).send({ invalidData: true });
	const deletedAddress = await AddressController.deleteAddress(addressId);
	res.status(200).send(deletedAddress);
});

export default router;