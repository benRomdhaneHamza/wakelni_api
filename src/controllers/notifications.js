class NotificationController {

	static newCommandNotif(_type, _body) {
		if (_type == 'NC') { // NOUVELLE COMMANDE
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
		if (_type == 'AC') { // COMMANDE ACCEPTE
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