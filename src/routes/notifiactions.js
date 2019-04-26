import User from "@/models/user";
import NotificationController from "@/controllers/notifications";
import express from 'express';
import FCM from "fcm-node";

const router = express.Router();
const serverKey = 'AAAAw3GFMUY:APA91bH--hdHkzQhcPtjghi0QTEgZq67m9qCSMbRNUQ-QuhZTu2NBwtpWWzRcKyR1VSM_mPZ4fV-8m_M7W-zGsyXJCdeuipEMikwg6ex9ti5mCfQt1rBxuqoSOvbpCcNJCZAztdSk9zU';
const fcm = new FCM(serverKey);

router.get('/', async (req, res) => {
	res.status(201).send({ message: 'welcome to users wakelni' });
});


router.post('/send', async (req, res) => {
	const receiver = req.body.receiver;
	const sender = req.body.sender;
	const notifData = req.body.notification;
	const notifType = req.body.type;
	
	const notifSent = await NotificationController.sendNotifiaction(receiver, sender, notifData, notifType);

	res.send(notifSent);
});

export default router;