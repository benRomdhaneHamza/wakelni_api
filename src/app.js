import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import keystone from '@/initKeystone';

const app = express();
app.use(cookieParser());
let keystoneInstance = null;

// parse application/json
app.use(bodyParser.json({
	verify: (req, res, buf) => {
		req.rawBody = buf.toString();
	}
}));

// Morgan
app.use(morgan('dev'));

setTimeout(() => {
	const WAKELNI_DB_HOST = process.env.WAKELNI_DB_HOST    
	// Connect to Mongoose
	console.log('DATABASE');
	mongoose
		.connect(
			WAKELNI_DB_HOST,
			{
				socketTimeoutMS: 0,
				keepAlive: true,
				reconnectTries: 30,
				useNewUrlParser: true
			}
		)
		.then(() => {
			// Init Keystone
			keystoneInstance = keystone(WAKELNI_DB_HOST);
		});
}, 1000);

setTimeout(() => {
	app.use((req, res) => {
		res.status(404).json({
			message: 'api.404_error'+ req.originalUrl
		});
	});

	app.use((err, req, res, next) => {
		if (err) {
			res.status(err.status || 500).json({
				error: {
					message: err.message || 'Something failed'
				}
			});
			throw err;
		} else {
			next();
		}
	});
}, 2000);

export const wakelniKeystoneInstance = () => keystoneInstance;
export default app;