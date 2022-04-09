let {getAutos, getSucursales, writeJson} = require('../data/dataBase')


let controller = {
    adminIndex: (req, res) => {
        res.render('admin/adminIndex')
    },
    sucursales: (req, res) => {
        res.render('admin/adminSucursales', {
            sucursales: getSucursales,
            autos: function (idSucursal) {
                return getAutos.filter(auto => auto.sucursal === idSucursal)
            }
        })
    },
    create: (req, res) => {
        res.render('admin/agregarSucursal')
    },
    store: (req, res) => {
        let lastId = 1;

        getSucursales.forEach(sucursal => {
            if(sucursal.id > lastId){
                lastId = sucursal.id
            }
        });

        let nuevaSucursal = {
            id: lastId + 1,
            nombre: req.body.nombre,
            direccion: req.body.direccion,
            telefono: req.body.telefono,
            imagen: "sucursal.jpg" 
        }

        getSucursales.push(nuevaSucursal);

        writeJson(getSucursales)

        res.redirect('/admin/sucursales')
    },
    edit: (req, res) => {
        let idSucursal = +req.params.id;

        let sucursal = getSucursales.find(sucursal => sucursal.id === idSucursal)

        res.render('admin/editarSucursal', {
            sucursal
        })
    },
    update: (req, res) => {
        let idSucursal = +req.params.id;
        
        const {nombre, direccion, telefono} = req.body;

        getSucursales.forEach(sucursal => {
            if(sucursal.id === idSucursal){
                sucursal.id = sucursal.id,
                sucursal.nombre = nombre,
                sucursal.direccion = direccion,
                sucursal.telefono = telefono,
                sucursal.imagen = sucursal.imagen
            }
        })

        writeJson(getSucursales)
        res.redirect('/admin/sucursales')
    },
    fatality: (req, res) => {
        let idSucursal = +req.params.id;

        getSucursales.forEach(sucursal => {
            if(sucursal.id === idSucursal){
                let sucursalAEliminar = getSucursales.indexOf(sucursal)
                getSucursales.splice(sucursalAEliminar, 1)
            }
        })

        writeJson(getSucursales)
        res.redirect('/admin/sucursales')
    } 

}


module.exports = controller