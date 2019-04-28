import { List, Field } from 'keystone';

const schemaName = 'Command';
const schemaData = {
	user: {
		type: Field.Types.Relationship, ref: 'User',
		required: true,
		initial: true
	},
	space: {
		type: Field.Types.Relationship, ref: 'Space',
		required: true,
		initial: true
	},
	mealsList: {
		type: Field.Types.Relationship, ref: 'Meal',
		many: true,
		multiple: true
	},
	description: {
		type: String
	},
	state: { type: Field.Types.Select, options: 'SENT, REJECTED, ACCEPTED, ONWAY, PAYED', default: 'SENT' },
	price: {
		type: Number,
	},
	createdAt: {
		type: Field.Types.Datetime,
		default: Date.now
	},
	code: {
		type: String
	}
}

const schemaKeystone = new List(schemaName, {
	map: { name: '_id' },
	searchFields: 'user space price state',
	plural: 'commands',
	singular: 'command'
});

schemaKeystone.add(schemaData);
schemaKeystone.defaultColumns = 'user, space, price, state';

schemaKeystone.track = {
	createdAt: true,
	updatedAt: true,
	createdBy: true,
	updatedBy: true
};

// todo : add pre save hook to check email and other data

schemaKeystone.register();

export default schemaKeystone.model;

