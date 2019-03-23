import { List, Field } from 'keystone';

const schemaName = 'Meal';
const schemaData = {
	space: {
		type: Field.Types.Relationship, ref: 'Space',
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
	price: {
		type: String,
		required: true,
		initial: true
	},
	image: {
		type: Field.Types.CloudinaryImage,
		folder: 'meals/',
		autoCleanup : true
	},
	available: {
		type: Boolean,
		default: true
	}
}

const schemaKeystone = new List(schemaName, {
	map: { name: 'name' },
	searchFields: 'space name price',
	plural: 'meals',
	singular: 'meal'
});

schemaKeystone.add(schemaData);
schemaKeystone.defaultColumns = '_id, name, space, price';

schemaKeystone.track = {
	createdAt: true,
	updatedAt: true,
	createdBy: true,
	updatedBy: true
};

// todo : add pre save hook to check email and other data

schemaKeystone.register();

export default schemaKeystone.model;

