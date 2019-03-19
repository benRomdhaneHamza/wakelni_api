import { List, Field } from 'keystone';
import i18nKeystone from '@/utils/i18nKeystone';

const schemaName = 'User';
const schemaData = {
	firstname: {
		type: String,
		required: true,
		initial: true
	},
	lastname: {
		type: String,
		required: true,
		initial: true
	},
	hasSpace: {
		type: Boolean,
		default: false
	},
	email: {
		type: Field.Types.Email,
		required: true,
		initial: true,
		unique: true
	},
	password: {
		type: String
	},
	birthday: {
		type: Field.Types.Date
	},
	facebookId: {
		type: String
	},
	phone: String,
	gender: Number,
	zipCode: String,
	address: String,
}

const schemaKeystone = new List(schemaName, {
	map: { name: 'email' },
	searchFields: 'email firstname lastname',
	plural: 'users',
	singular: 'user'
});

schemaKeystone.add(schemaData);
schemaKeystone.defaultColumns = 'firstname, lastname, email';

schemaKeystone.track = {
	createdAt: true,
	updatedAt: true,
	createdBy: true,
	updatedBy: true
};

// todo : add pre save hook to check email and other data

schemaKeystone.register();

export default schemaKeystone.model;

