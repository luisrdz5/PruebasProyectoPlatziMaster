const { nanoid } = require('nanoid');
const bcrypt = require('bcryptjs');

const TABLA = 'users';
const TABLA_USER_ADDRESS = 'addresess';

function controller(injectedStore){
    let store = injectedStore;
    if (!store) {
        store = require('../../store/mysql');
    }
    
    async function insert(body) {
        const user = {
            id_users: nanoid(),
            login: '',
            first_name: '',
            last_name: '',
            email: body.email,
            photo: '',
            id_security_levels: '',
            id_shopping_carts:'',
            creation_date: new Date(),
            id_user_types: '',
            score: 0,
            available: 1,
            password: await bcrypt.hash(body.password,5),
        }
            return await store.insert(TABLA, user);
    }

    async function list(){
        return await store.list(TABLA);
    }

    async function get(id){
        const query = `SELECT * FROM ${TABLA} WHERE id_users='${id}'`;
        return await store.get(query);
    }

    async function getAddr(id){
        const query = `SELECT * FROM ${TABLA_USER_ADDRESS} WHERE id_users='${id}'`;
        return await store.get(query);
    }

    return {
        insert,
        list,
        get,
        getAddr,
    }
}

module.exports = controller;