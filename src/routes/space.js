import SpaceController from '@/controllers/space'
import PictureController from '@/controllers/picture'
import express from 'express';
import Authentication from "@/middelwares/authentication";

const router = express.Router();

// ******************************************************
// GET Spaces
// ******************************************************

// TODO BODY VALIDATION
router.get('/', Authentication(), async(req, res) => {
	const query = req.query;
	const meals = await SpaceController.getSpaces(query ? query : null);
	res.status(200).send(meals);
});

// ******************************************************
// GET Space BY ID
// ******************************************************

router.get('/:id', Authentication(), async(req, res) => {
	const id = req.params.id;
	const meal = await SpaceController.getSpaceById(id);
	res.status(200).send(meal);
});

router.post('/', Authentication(), PictureController.picture_upload('/spacecs/').single('image'), async(req, res) => {
	const spaceData = req.body;
	if (req.file) spaceData.logo = SpaceController.formatImage(req.file);
	const addedSpace = await SpaceController.addSpace(spaceData);
	if (!addedSpace) return res.status(404).send({ invalidData: true });
	res.status(200).send(addedSpace);
});

export default router;