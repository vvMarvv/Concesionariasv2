let express = require('express');
let router = express.Router();
let controller = require('../controllers/sucursalesController')

/* GET home page. */
router.get('/:id', controller.sucursal);

module.exports = router;
