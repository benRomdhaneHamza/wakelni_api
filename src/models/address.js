import { List, Field } from 'keystone';
import i18nKeystone from '@/utils/i18nKeystone';

const schemaName = 'Address';
const schemaData = {
    description: {
        type: String,
        required: true,
        initial: true
    },
    lat: {
        type: Number,
        required: true,
        initial: true
    },
    lng: {
        type: Number,
        required: true,
        initial: true
    },
    city: {
        type: String,
        initial: true
    },
    street: {
        type: String,
    },
    number: {
        type: Number
    }
}

const schemaKeystone = new List(schemaName, {
    map: { name: '_id' },
    searchFields: 'description lat lng city',
    plural: 'addresses',
    singular: 'address'
});

schemaKeystone.add(schemaData);
schemaKeystone.defaultColumns = 'description, lat, lng, city';

schemaKeystone.track = {
    createdAt: true,
    updatedAt: true,
    createdBy: true,
    updatedBy: true
};

// todo : add pre save hook to check email and other data

schemaKeystone.register();

export default schemaKeystone.model;

