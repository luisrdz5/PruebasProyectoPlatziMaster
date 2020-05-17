const bcrypt = require('bcryptjs');

const TABLA = 'users';

function controller(injectedStore){
    let store = injectedStore;
    if (!store) {
        store = require('../../store/mysql');
    }

    async function login(email, password){
        const query = `SELECT u.password FROM ${TABLA} as u WHERE u.email='${email}'`;
        try {
            const data = await store.get(query);
            const areEqual = await bcrypt.compare(password, data[0].password);
            if(areEqual){
                //@TODO
                //generar token
                //retornar token a cliente.
                return areEqual;
            }else{
                throw new Error('Datos Inválidos');
            }
        } catch (err) {
            throw err;
        }
    }

    return {
        login,
    }
}

module.exports = controller;