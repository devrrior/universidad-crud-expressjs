var userModel = require('./userModel');
var key = 'somekey234567884456753456';
var encryptor = require('simple-encryptor')(key);

module.exports.createUserDBService = (userDetails) => {

   return new Promise(function myFn(resolve, reject) {
       var userModelData = new userModel();

       userModelData.firstname = userDetails.firstname;
       userModelData.lastname = userDetails.lastname;
       userModelData.email = userDetails.email;
       userModelData.password = userDetails.password;
       var encrypted = encryptor.encrypt(userDetails.password);
       userModelData.password = encrypted;

       userModelData.save(function resultHandle(error, result) {

           if (error) {
               console.log(error);
               reject(false);
           } else {
               resolve(true);
           }
       });
   });
}

module.exports.loginuserDBService = (userDetails)=>  {
   return new Promise(function myFn(resolve, reject)  {
      userModel.findOne({ email: userDetails.email},function getresult(errorvalue, result) {
         if(errorvalue) {
            reject({status: false, msg: "Datos Invalidos"});
         }
         else {
            if(result !=undefined &&  result !=null) {
               var decrypted = encryptor.decrypt(result.password);

               if(decrypted== userDetails.password) {
                  resolve({status: true,msg: "Usuario Validado"});
               }
               else {
                  reject({status: false,msg: "Falla en validacion de usuario"});
               }
            }
            else {
               reject({status: false,msg: "Detalles de usuario invalido"});
            }
         }
      });
   });
}

module.exports.getUserByFirstNameDBService = (firstname) => {
    return new Promise(function myFn(resolve, reject) {
        userModel.find({firstname},function getresult(errorvalue, result) {
            if(errorvalue) {
                reject({status: false, msg: "Datos Invalidos"});
            }
            else {
                resolve({status: true, msg: "Usuarios encontrados", usuarios: result})
            }
        });
    });
}

module.exports.updateUserDBService = (id, userDetails) => {
    userDetails.password = encryptor.encrypt(userDetails.password);

    return new Promise(function (resolve, reject) {
        userModel.findOneAndUpdate({_id: id}, userDetails, function getresult(errorvalue, result) {
            if(errorvalue) {
                reject({status: false, msg: "Datos Invalidos"});
            }
            else {
                resolve({status: true, msg: "Usuario actualizado", usuarios: result})
            }
        })
    });
}

module.exports.deleteUserDBService = (id) => {
    return new Promise(function (resolve, reject) {
        userModel.deleteOne({_id: id}, function getresult(errorvalue, result) {
            if(errorvalue) {
                reject({status: false, msg: "Datos Invalidos"});
            }
            else {
                resolve({status: true, msg: "Usuario eliminado"})
            }
        });
    })
}

module.exports.getByEmailDBService = (email) => {
    return new Promise(function (resolve, reject) {
        userModel.findOne({email}, function getresult(errorvalue, result) {
            if(errorvalue) {
                reject({status: false, msg: "Datos Invalidos"});
            }
            else {
                if(result !=undefined &&  result !=null) {
                    resolve({status: true});
                }
                resolve({status: false})
            }
        })
    })
}

module.exports.getByIdDBService = (id) => {
    return new Promise(function (resolve, reject) {
        userModel.findOne({_id: id}, function getresult(errorvalue, result) {
            if(errorvalue) {
                reject({status: false, msg: "Datos Invalidos"});
            }
            else {
                if(result !=undefined &&  result !=null) {
                    resolve({status: true});
                }
                resolve({status: false})
            }
        })
    })
}
