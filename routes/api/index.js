const express = require('express');
const router = express.Router();


/**
 * @swagger
 * /api:
 *  post:
 *    description: Use to request all customers
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.post('/', (req, res) => {
    res.json({content: "LOWER"});
});


/**
 * @swagger
 * /api/test:
 *  get:
 *    description: Use to request all customers
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/test', (req, res) => {
    res.json({test : "TestContent"})
});

module.exports  = router;