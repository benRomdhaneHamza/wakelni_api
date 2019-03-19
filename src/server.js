import { createServer } from 'http';
import app from '@/app';

require('dotenv').config();

const PORT = process.env.PORT || 8080;

console.log('NODE_ENV', process.env.NODE_ENV);

// const server = createServer(app);
// Listen to the server on PORT
// server.listen(PORT);
// https.createServer({
// 	fskey: fs.readFileSync('src/_cert/test_csr.pem', 'utf8'),
//   cert: fs.readFileSync('src/_cert/test_server.crt', 'utf8')
// }, app).listen(PORT);

console.log(`Server listening on port ${PORT}`);

// **********************************************************************************************
// *** Exit handler
// **********************************************************************************************
process.on('SIGINT', () => {
	logger.info('Received SIGINT. Press Control-C to exit.');
	process.exit(0);
});

// **********************************************************************************************
// *** Error handler
// **********************************************************************************************

process.on('unhandledRejection', (reason, error) => {
	console.error('unhandledRejection: ', reason, error);
});

process.on('uncaughtException', (error) => {
	console.error('uncaughtException:', error);
});