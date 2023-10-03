const router = require('express').Router();
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

router.use('/api', swaggerUI.serve);
router.get('/api', swaggerUI.setup(swaggerDocument));

module.exports = router;