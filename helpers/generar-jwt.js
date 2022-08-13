const jwt = require('jsonwebtoken');

const generarJWT = (uid = '') => {

    return new Promise(( resolve, reject ) => {
        const payload = { uid };

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '4h'
        }, (error, token)=>{
            if(error){
                console.log(error);
                reject('Error al crear token');
            }else{
                resolve(token);
            }
        })
    })

}

module.exports = {
    generarJWT
}