const { nanoid } = require('nanoid');

const TABLA = 'categories';

module.exports = function(injectedStore){
    let store = injectedStore;
    if (!store) {
        store = require('../../store/mysql');
    }

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

    async function update(body) {
        const category = {
            description: body.description,
            cat_name: body.cat_name,
            id_parent_category: body.id_parent_category,
        }
        const query = `UPDATE ${TABLA} SET ? WHERE id_categories='${body.id_categories}'`;
        return await store.update(query, category);
    }

    async function list(){
        return await store.list(TABLA);
    }

    async function get(id){
        const query = `SELECT * FROM ${TABLA} WHERE id_categories='${id}'`;
        //return await store.get(TABLA, id);
        return await store.get(query);
    }

    return {
        insert,
        update,
        list,
        get,
    }

}