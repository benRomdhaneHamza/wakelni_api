import { Field, List } from 'keystone';

// **********************************************************************************************
// *** Keystone Setup
// **********************************************************************************************

const schemaName = 'Admin';
const schemaData = {
	displayName: { type: String },
	password: { type: Field.Types.Password },
	email: { type: Field.Types.Email, unique: true }
};

const schemaKeystone = new List(schemaName, {
	searchFields: 'displayName, email'
});
schemaKeystone.add(schemaData);
schemaKeystone.schema.virtual('canAccessKeystone').get(() => true);
schemaKeystone.defaultColumns = 'displayName, email';
schemaKeystone.track = {
	createdAt: true,
	updatedAt: true,
	createdBy: true,
	updatedBy: true
};
schemaKeystone.register();

