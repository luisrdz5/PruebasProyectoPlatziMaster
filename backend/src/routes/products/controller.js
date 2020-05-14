const { nanoid } = require('nanoid');

const TABLA = 'products';

module.exports = function(injectedStore){
    let store = injectedStore;
    if (!store) {
        store = require('../../store/mysql');
    }

    async function insert(body) {
        const product = {
            description: body.description,
            product_title: body.title,
            cost: body.cost,
            quantity: body.quantity,
            creation_date: new Date(),
            id_seller: '123',
            available: 1,
            id_countries:'123',
            id_albums:'123',
            score: 0,
        }
        product.id_products = nanoid();

        return await store.insert(TABLA, product);
    }

    async function list(){
        return await store.list(TABLA);
    }

    async function get(id){
        const query = `SELECT * FROM ${TABLA} WHERE id_products='${id}'`;
        //return await store.get(TABLA, id);
        return await store.get(query);
    }

    async function getProductByName(searchWord){
        //select * from products where product_title like '%marca%' or description like '%cafe%'
        const query = `SELECT * FROM ${TABLA} WHERE product_title like'%${searchWord}%' or description like '%${searchWord}%'`;
        return await store.get(query);
    }

    async function getProductByPrice(min_price, max_price){
        //select * from products where cost >= 40000 and cost <= 75000
        const query = `SELECT * FROM ${TABLA} WHERE cost >= ${min_price} and cost <= ${max_price}`;
        return await store.get(query);
    }

    return {
        insert,
        list,
        get,
        getProductByName,
        getProductByPrice,
    }

}