const TABLA = 'users';

module.exports = function(injectedStore){
    let store = injectedStore;
    if (!store) {
        store = require('../../store/mysql');
    }

    async function login(req){

    }

    return {
        login,
    }
}