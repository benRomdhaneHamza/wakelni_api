import Store from "@/models/store";
import express from 'express';
import FCM from "fcm-node";

const router = express.Router();
const serverKey = 'AAAAw3GFMUY:APA91bH--hdHkzQhcPtjghi0QTEgZq67m9qCSMbRNUQ-QuhZTu2NBwtpWWzRcKyR1VSM_mPZ4fV-8m_M7W-zGsyXJCdeuipEMikwg6ex9ti5mCfQt1rBxuqoSOvbpCcNJCZAztdSk9zU';
const fcm = new FCM(serverKey);

router.get('/', async (req, res) => {
	res.status(201).send({ message: 'welcome to users wakelni' });
});


router.post('/store', async (req, res) => {
	console.log('notification ....');
	console.log('notification token', req.body);

	const store = new Store({
		token: req.body
	})

	const savedStore = await store.save();

	res.json(savedStore);
});

router.get('/send', async (req, res) => {
	Store.find().exec().then(_tokens => {
		let message = null;
		for (let i = 0; i < _tokens.length; i++) {
			message = {
				// this may vary according to the message type (single
				// recipient, multicast, topic, et cetera)

				to: _tokens[i].token,
				collapse_key: 'green',

				notification: {
					title: 'Title of your push notification',
					body: 'Body of your push notification'
				},

				data: {
					// you can send only notification or only 
					// data(or include both)
					my_key: 'my value',
					my_another_key: 'my another value'
				}
			};
			fcm.send(message, function (err, response) {
				if (err) {
					console.log("Something has gone wrong!");
				} else {
					console.log("Successfully sent with response: ", response);
				}
			});
		}
		res.send('send msg');
	});
});

export default router;