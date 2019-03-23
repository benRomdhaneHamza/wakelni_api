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
		many: true
	},
	state: { type: Field.Types.Select, options: 'PASSED, COOKING, LIVRED', default: 'PASSED' },
	price: {
		type: Number,
	}
}

const schemaKeystone = new List(schemaName, {
	map: { name: 'name' },
	searchFields: 'space name price',
	plural: 'commands',
	singular: 'command'
});

schemaKeystone.add(schemaData);
schemaKeystone.defaultColumns = 'name, space, price';

schemaKeystone.track = {
	createdAt: true,
	updatedAt: true,
	createdBy: true,
	updatedBy: true
};

// todo : add pre save hook to check email and other data

schemaKeystone.register();

export default schemaKeystone.model;

