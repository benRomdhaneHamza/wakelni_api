import express from 'express';
import cors from 'cors';
import users from './users';
import pictures from './pictures';
import commands from './commands';
import meals from './meals';

const router = express.Router();

// router.use(cors({
// 	origin: '*',
// 	methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE']
// }));
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.use('/api/users', users);
router.use('/api/commands', commands);
router.use('/api/pictures', pictures);
router.use('/api/meals', meals);
// router.use('/api/cities', cities);

router.all('/api', (req, res) => {
	res.send('Welcome to WAKELNI API');
});

export default router;

