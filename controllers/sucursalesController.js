let { getAutos, getSucursales } = require('../data/dataBase') 

let controller = {
    sucursal: (req, res) => {
        let sucursalId = +req.params.id;

        let sucursal = getSucursales.find(sucursal => sucursal.id === sucursalId)

        if (sucursal !== undefined) {
            let autos = getAutos.filter(auto => auto.sucursal === sucursalId)

            res.render('sucursal', {
                sucursal,
                autos
            })
            
        } else {
            res.send("No encontramos la solicitada")
        }
    } 
}

module.exports = controller