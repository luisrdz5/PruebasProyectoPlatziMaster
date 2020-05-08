const { nanoid } = require('nanoid');

const TABLA = 'products';

module.exports = function(injectedStore){
    let store = injectedStore;
    if (!store) {
        store = require('../../store/mysql');
    }

    async function upsert(body) {
        const product = {
            description: body.description,
            photo: body.photo,
            cost: body.cost,
            qty: body.qty,
            available: body.available,
            score: body.score || '0',
            creation_date: new Date(),
        }

        if (body.id) {
            product.ProductID = body.id;
        } else {
            product.ProductID = nanoid();
        }

        return await store.insert(TABLA, product);
    }

    async function list(){
        return await store.list(TABLA);
    }

    async function get(id){
        const query = `SELECT * FROM ${TABLA} WHERE ProductID='${id}'`;
        //return await store.get(TABLA, id);
        return await store.get(query);
    }

    return {
        upsert,
        list,
        get,
    }

}