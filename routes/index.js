const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

// catch all route
router.use((req, res) => {
    res.status(404).send('<h1>Nobody here but us... cats? 🐈 🐈 🐈 </h1>')
});
module.exports = router; 