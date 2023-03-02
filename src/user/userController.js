var userService = require('./userServices');

var createUserControllerFunc = async (req, res) =>  {
    try {
        var {status: isUserExists} = await userService.getByEmailDBService(req.body.email);

        if(isUserExists) {
            return res.send({ status: false, message: "Usuario con correo existente"})
        }

        var status = await userService.createUserDBService(req.body);

        if (status) {
            res.send({ "status": true, "message": "Usuario creado" });
        } else {
            res.send({ "status": false, "message": "Error creando usuario" });
        }
    }
    catch(err) {
        console.log(err);
    }
}

var loginUserControllerFunc = async (req, res) => {
    var result = null;
    try {
        result = await userService.loginuserDBService(req.body);
        if (result.status) {
            res.send({ "status": true, "message": result.msg });
        } else {
            res.send({ "status": false, "message": result.msg });
        }

    } catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}

var getUserByFirstNameControllerFunc = async (req, res) => {
    var result = null;
    try {
        result = await userService.getUserByFirstNameDBService(req.query.firstname);
        res.send(result);
    } catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}

var updateUserByIdControllerFunc = async (req, res) => {
    var result = null;
    try {
        result = await userService.updateUserDBService(req.params.id, req.body);
        res.send(result);
    } catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}

var deleteUserByIdControllerFunc = async (req, res) => {
    var result = null;
    try {
        var {status: isUserExists} = await userService.getByIdDBService(req.params.id);
        console.log(`is exist ${isUserExists}`);


        if(isUserExists) {
            return res.send({ status: false, message: "Usuario no existe"})
        }

        result = await userService.deleteUserDBService(req.params.id);
        res.send(result);
    } catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}

module.exports = { createUserControllerFunc,
                    loginUserControllerFunc,
                    getUserByFirstNameControllerFunc,
                    updateUserByIdControllerFunc,
                    deleteUserByIdControllerFunc};