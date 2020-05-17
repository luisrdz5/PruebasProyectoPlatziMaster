/**Controller to manage store of categories endpoint
 * @module routes/categories/controller
 */
const { nanoid } = require('nanoid');

const TABLA = 'categories';
 
function controller(injectedStore){
    let store = injectedStore;
    if (!store) {
        store = require('../../store/mysql');
    }
    /**
     * Logic to insert a Category into the store.
     * @param {Object} body - The Category information 
     * @returns {Promise<object[]>} res - result of Category insertion
     */
    async function insert(body) {
        const category = {
            description: body.description,
            cat_name: body.cat_name,
            id_parent_category: body.id_parent_category,
            creation_date: new Date(),     
        }
        category.id_categories = nanoid();
            return await store.insert(TABLA, category);
    }
    /**
     * Logic to update a Category
     * @method PUT 
     * @param {Object} body - The Category information to be updated
     * @returns {Object} res - result of Category update operation
    */
    async function update(body) {
        const category = {
            description: body.description,
            cat_name: body.cat_name,
            id_parent_category: body.id_parent_category,
        }
        const query = `UPDATE ${TABLA} SET ? WHERE id_categories='${body.id_categories}'`;
        return await store.update(query, category);
    }
    /**
     * Logic to list all Categories of the store.
     * @returns {Promise<object[]>} res - List of Categories
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