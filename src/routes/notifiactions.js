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
	const user = await User.findById(receiver).select('fcmToken');

	const notifBody = NotificationController.newCommandNotif(notifType, notifData);

	let message = {
		to: user.fcmToken,
		notification: notifBody.notification,
		data: notifBody.data
	}

	fcm.send(message, function (err, response) {
		if (err) {
			console.log("Something has gone wrong!");
		} else {
			console.log("Successfully sent with response: ", response);
		}
	});
	res.send('notification sent');
});

export default router;