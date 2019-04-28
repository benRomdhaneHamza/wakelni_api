import FCM from "fcm-node";
import User from "@/models/user";

const serverKey = 'AAAAw3GFMUY:APA91bH--hdHkzQhcPtjghi0QTEgZq67m9qCSMbRNUQ-QuhZTu2NBwtpWWzRcKyR1VSM_mPZ4fV-8m_M7W-zGsyXJCdeuipEMikwg6ex9ti5mCfQt1rBxuqoSOvbpCcNJCZAztdSk9zU';
const fcm = new FCM(serverKey);

class NotificationController {

	static sendNotifiaction(_receiver, _sender, _notification, _type) {
		return new Promise(async (resolve, reject) => {
			const receiver = _receiver;
			const sender = _sender;
			const notifData = _notification;
			const notifType = _type;
			const user = await User.findById(receiver).select('fcmToken');
		
			const notifBody = this.newCommandNotif(notifType, notifData);
		
			let message = {
				to: user.fcmToken,
				notification: notifBody.notification,
				data: notifBody.data
			}
		
			fcm.send(message, function (err, response) {
				if (err) {
					return reject(err);
				} else {
					return resolve(response)
				}
			});
		})
	}

	static newCommandNotif(_type, _body) {
		if (_type == 'NC') { // NEW COMMAND
			return {
				notification: {
					title: 'Nouvelle commande',
					body: 'Vous avez recu une nouvelle commande',
					sound: "default",
				},
				data: {
					commandId: _body.command
				}
			}
		}
		if (_type == 'AC') { // ACCEPTED COMMAND
			return {
				notification: {
					title: 'Commande accepté',
					body: 'Votre commande a '+_body.space+ 'a été accepté'
				},
				data: {
					commandId: _body.command,
					space: _body.space
				}
			}
		}
		if (_type == 'RC') { // REFUSED COMMAND
			return {
				notification: {
					title: 'Commande refusé',
					body: 'Votre commande a '+_body.space+ 'a été accepté'
				},
				data: {
					commandId: _body.command,
					space: _body.space
				}
			}
		}
		if (_type == 'LN') { // NOTIFIER LIVREURS
			return {
				notification: {
					title: 'Une commande en attente',
					body: 'une commande chez'+_body.space+ 'est en attente'
				},
				data: {
					space: _body.space
				}
			}
		}

	}

}

export default NotificationController;