import { List, Field } from 'keystone';
import i18nKeystone from '@/utils/i18nKeystone';

const schemaName = 'Store';
const schemaData = {
	token: {
		type: String,
	}
}

const schemaKeystone = new List(schemaName, {
	map: { name: 'token' },
	searchFields: 'token',
	plural: 'token',
	singular: 'token'
});

schemaKeystone.add(schemaData);
schemaKeystone.defaultColumns = 'token';

schemaKeystone.track = {
	createdAt: true,
	updatedAt: true,
	createdBy: true,
	updatedBy: true
};

schemaKeystone.register();

export default schemaKeystone.model;

