import PictureController from '@/controllers/picture'
import express from 'express';

const router = express.Router();

// TODO BODY VALIDATION
router.post('/', PictureController.picture_upload('/users/').single('image'), async(req, res) => {
	if (!req.file || !req.file.secure_url) return res.status(404).send({ uploadError: true });
	res.status(200).send({ secure_url: req.file.secure_url });
});

export default router;