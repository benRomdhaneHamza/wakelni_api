import express from 'express';
import Authentication from "@/middelwares/authentication";
import AddressController from '@/controllers/address';


const router = express.Router();

// ******************************************************
// PASS COMMAND
// ******************************************************

// TODO BODY VALIDATION
// TODO VERIFY COMMAND FROM ONE SPACE
router.post('/user/', Authentication(), async (req, res) => {
	const user = res.locals.user;
    const addressData = req.body;
    
	// ******************************************************
    const addedAddress = await AddressController.addUserAddress(addressData,user);
    if (!addedAddress) return res.status(404).send({ invalidData: true });
    res.status(200).send(addedAddress);
});
export default router;