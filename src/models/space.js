import { List, Field } from 'keystone';

const schemaName = 'Space';
const schemaData = {
	admin: {
		type: Field.Types.Relationship, ref: 'User',
		required: true,
		initial: true
	},
	name: {
		type: String,
		required: true,
		initial: true
	},
	description: {
		type: String,
		initial: true
	},
	specialty: {
		type: String
	},
	lat: {
		type: Number
	},
	lng: {
		type: Number
	},
	city: {
		type: String,
		required: true,
		initial: true
	},
	logo: {
		type: Field.Types.CloudinaryImage,
		folder: 'spaces/',
		autoCleanup : true
	},
	phone: String,
}

const schemaKeystone = new List(schemaName, {
	map: { name: 'name' },
	searchFields: 'name city',
	plural: 'spaces',
	singular: 'space'
});

schemaKeystone.add(schemaData);
schemaKeystone.defaultColumns = 'name, description, city';

schemaKeystone.track = {
	createdAt: true,
	updatedAt: true,
	createdBy: true,
	updatedBy: true
};

// todo : add pre save hook to check email and other data

schemaKeystone.register();

export default schemaKeystone.model;

