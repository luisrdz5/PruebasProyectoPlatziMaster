/**Controller to manage store of addresses endpoint
 * @module routes/addresses/controller
 */
const { nanoid } = require('nanoid');

const TABLA_ADDR = 'users';
const TABLA_USER = 'addresses';
 
function controller(injectedStore){
    let store = injectedStore;
    if (!store) {
        store = require('../../store/mysql');
    }
    /**
     * Logic to insert a Address into the store.
     * @param {Object} body - The Address information: body.user_id: user id own of address  
     * @returns {Promise<object[]>} res - result of Address insertion
     */
    async function insert(body) {
        const address = {
            id_directions: nanoid(),
            id_users: body.id_user,
            id_cities_catalog: '1',
            id_countries_catalog:'1',
            id_states_catalog: '1',
            street: body.street,
            street_number: 'a',
            id_postal_codes: 'q',
            available: true,
            creation_date: new Date()
        }
        return await store.insert(TABLA_ADDR, address);
    }
    /**
     * Logic to update an Address
     * @method PUT 
     * @param {Object} body - The Address information to be updated body.id_directions: id of address
     * @returns {Object} res - result of Address update operation
    */
    async function update(body) {
        const address = {
            id_cities_catalog: '1',
            id_countries_catalog:'1',
            id_states_catalog: '1',
            street: body.street,
            street_number: 'a',
            id_postal_codes: 'q',
            available: true,
        }
        const query = `UPDATE ${TABLA_ADDR} SET ? WHERE id_directions='${body.id_directions}'`;
        return await store.update(query, address);
    }
    /**
     * Logic to list all Addresses of the store. //debug purpose
     * @returns {Promise<object[]>} res - List of Addresses
     */
    async function list(){
        return await store.list(TABLA);
    }
     /**
     * Logic to get one Category with a category ID target.
     * @param {string} id - The Category ID target 
     * @returns {Promise<object[]>} res - category
     */
    async function get(id){
        const query = `SELECT * FROM ${TABLA} WHERE id_categories='${id}'`;
        return await store.get(query);
    }

    return {
        insert,
        update,
        list,
        get,
    }
}

module.exports = controller;