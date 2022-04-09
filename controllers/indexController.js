let { getSucursales } = require('../data/dataBase.js')


let controller = {
    index: function(req, res) {
        res.render('index', { 
            sucursales: getSucursales 
        });
    }
}

module.exports = controller