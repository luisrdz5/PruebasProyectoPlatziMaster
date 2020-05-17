/**Controller to manage store of users endpoint
 * @module routes/user/controller
 */
const { nanoid } = require('nanoid');
const bcrypt = require('bcryptjs');

const TABLA = 'users';
const TABLA_USER_ADDRESS = 'addresses';

function controller(injectedStore){
    let store = injectedStore;
    if (!store) {
        store = require('../../store/mysql');
    }
    /**
     * Logic to insert an User into the store.
     * @param {Object} body - The User information 
     * @returns {Promise<object[]>} res - result of User insertion
     */
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
    /**
     * Logic to list all Users of the store.
     * @returns {Promise<object[]>} res - List of Users
     */
    async function list(){
        return await store.list(TABLA);
    }
    /**
     * Logic to get one User with an ID target.
     * @param {string} id - The User ID target 
     * @returns {Promise<object[]>} res - result of one User
     */
    async function get(id){
        const query = `SELECT * FROM ${TABLA} WHERE id_users='${id}'`;
        return await store.get(query);
    }
    /**
     * Logic to get all user addresses with an user ID target.
     * @param {string} id - The User ID target 
     * @returns {Promise<object[]>} res - list od all user addresses
     */
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