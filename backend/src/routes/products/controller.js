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
            score: body.score || '',
            creation_date: new Date(),
        }

        if (body.id) {
            product.id = body.id;
        } else {
            product.id = nanoid();
        }

        return await store.insert(TABLA, product);
    }

    async function list(){
        return await store.list(TABLA);
    }

    return {
        upsert,
        list,
    }

}