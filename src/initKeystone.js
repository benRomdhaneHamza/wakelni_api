import keystone from 'keystone';

const keystoneFunc = (WAKELNI_DB_HOST) => {
	keystone.init({
		'cookie secret': process.env.KEYSTONE_SECRET,
		'session store': 'mongo',
		name: 'Wakelni Admin Dashboard',
		brand: 'Wakelni',
		'user model': 'Admin',
		'auto update': true,
		port: process.env.PORT || 8080,
		auth: true,
		mongo: WAKELNI_DB_HOST,
		'cloudinary config': process.env.CLOUDINARY_URL || {
			cloud_name: 'du7wjgy2h',
			api_key: '767354636556411',
			api_secret: '_IJHxpR-f-BgJLnaHX5OR3GmSKY',
			private_cdn: false,
			secure_distribution: null
		}
	});
	keystone.import('models');
	keystone.start();
};

if (process.argv[2] === '--standalone') {
	const WAKELNI_DB_HOST = process.env.WAKELNI_DB_HOST;
	keystoneFunc(WAKELNI_DB_HOST);
}

export default keystoneFunc;
