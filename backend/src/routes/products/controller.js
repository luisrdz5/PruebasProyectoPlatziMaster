const { nanoid } = require('nanoid');

const TABLA = 'products';
const TABLA_ALBUMS = 'albums';
const TABLA_PHOTOS = 'product_photos';

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
            id_albums:'222',
            id_categories:body.id_categories,
            score: 0,
        }
        product.id_products = nanoid();

        const album = {
            id_albums: nanoid(), 
            id_products: product.id_products,
            description: body.title,
            created_date: new Date()
        }
        const albumCreated = await store.insert(TABLA_ALBUMS, album);
        console.log(albumCreated);

        if(body.photo){
            const photo = {
                id_product_photos: nanoid(),
                description: body.photo.description,
                url_photo: body.photo.url,
                id_albums: album.id_albums,
                created_date: new Date(),
                visible: true,
            }
            const photoCreated = await store.insert(TABLA_PHOTOS, photo);
            console.log(photoCreated);
        }

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