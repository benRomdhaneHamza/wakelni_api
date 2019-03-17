import keystone from 'keystone';

const keystoneFunc = (WAKELNI_DB_HOST) => {
	keystone.init({
		'cookie secret': process.env.KEYSTONE_SECRET,
		'session store': 'mongo',
		name: 'Wakelni Admin Dashboard',
		brand: 'Wakelni',
		'user model': 'Admin',
		'auto update': true,
		port: process.env.KEYSTONE_PORT,
		auth: true,
		mongo: WAKELNI_DB_HOST
	});
	keystone.import('models');
	keystone.start();
};

if (process.argv[2] === '--standalone') {
	const WAKELNI_DB_HOST = process.env.WAKELNI_DB_HOST;
	keystoneFunc(WAKELNI_DB_HOST);
}

export default keystoneFunc;
