import express from 'express';

const router = express.Router();

// router.use('/api/users', users);
// router.use('/api/cities', cities);

router.all('/api', (req, res) => {
	res.send('Welcome to DFLATOR API');
});

export default router;

