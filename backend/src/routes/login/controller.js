const bcrypt = require('bcryptjs');

const TABLA = 'users';

module.exports = function(injectedStore){
    let store = injectedStore;
    if (!store) {
        store = require('../../store/mysql');
    }

    async function login(email, password){
        //select u.password from users as u where u.email='lilia@name.com'
        const query = `SELECT u.password FROM ${TABLA} as u WHERE u.email='${email}'`;
        const data = await store.get(query);
        return bcrypt.compare(password, data[0].password)
            .then( areEqual => {
                if(areEqual === true){
                    //generar token
                    return true;
                }else{
                    throw new Error('Datos inválidos');
                }
            })
            .catch( err => {
                throw err;
            })

    }

    return {
        login,
    }
}