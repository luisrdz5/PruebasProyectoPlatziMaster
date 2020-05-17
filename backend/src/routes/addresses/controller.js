/**Controller to manage store of addresses endpoint
 * @module routes/addresses/controller
 */
const { nanoid } = require('nanoid');

const TABLA_ADDR = 'directions';
 
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
            id_cities_catalog: body.id_cities_catalog,
            id_countries_catalog: body.id_countries_catalog,
            id_states_catalog: body.id_states_catalog,
            street: body.street,
            street_number: body.street_number,
            id_postal_codes: body.id_postal_codes,
            available: body.available,
        }
        const query = `UPDATE ${TABLA_ADDR} SET ? WHERE id_directions='${body.id_directions}'`;
        return await store.update(query, address);
    }
    /**
     * Logic to list all Addresses of the store. //debug purpose
     * @returns {Promise<object[]>} res - List of Addresses
     */
    async function list(){
        return await store.list(TABLA_ADDR);
    }
     /**
     * Logic to get all Addresses with an user ID target.
     * @param {string} id - The User ID of addresses target 
     * @returns {Promise<object[]>} res - addresses list own to a user ID
     */
    async function get(id){
        const query = `SELECT * FROM ${TABLA_ADDR} WHERE id_users='${id}'`;
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