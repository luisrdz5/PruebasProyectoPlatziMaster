const { nanoid } = require('nanoid');

const TABLA = 'products';
const TABLA_ALBUMS = 'albums';
const TABLA_PHOTOS = 'product_photos';

function controller(injectedStore){
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
        try{
            await store.insert(TABLA_ALBUMS, album);
        }catch(err){
            throw err;
        }
        
        if(body.photo){
            const photo = {
                id_product_photos: nanoid(),
                description: body.photo.description,
                url_photo: body.photo.url,
                id_albums: album.id_albums,
                created_date: new Date(),
                visible: true,
            }
            try{
                await store.insert(TABLA_PHOTOS, photo);
            }catch(err){
                throw err;
            }
        }
            return await store.insert(TABLA, product);
    }

    async function update(body) {
        
        const product = {
            description: body.description,
            product_title: body.title,
            cost: body.cost,
            quantity: body.quantity,
            id_seller: '123',
            available: body.available,
            id_countries:'123',
            id_categories:body.id_categories,
        }

        if(body.photo){
            const photo = {
                description: body.photo.description,
                url_photo: body.photo.url,
                visible: body.photo.visible,
            }
            const queryUpdatePhoto = `UPDATE ${TABLA_PHOTOS} SET ? WHERE id_albums=(SELECT id_albums FROM ${TABLA_ALBUMS} WHERE albums.id_products='${body.id_products}')`;
            const resultUpdatePhoto = store.update(queryUpdatePhoto, photo);
            console.log(resultUpdatePhoto);
        }

        const queryUpdateProductInfo = `UPDATE ${TABLA} SET ? WHERE id_products='${body.id_products}'`;
        return await store.update(queryUpdateProductInfo, product);
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

    async function getProductsByCategory(cat_id){
        //SELECT * FROM `products` WHERE id_categories='idUhZCmV_LpUxHV6Uqz39'
        const query = `SELECT * FROM ${TABLA} WHERE id_categories='${cat_id}'`;
        return await store.get(query);
    }
    
    return {
        insert,
        update,
        list,
        get,
        getProductByName,
        getProductByPrice,
        getProductsByCategory,
    }
}

module.exports = controller;