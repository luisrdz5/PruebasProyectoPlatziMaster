const { nanoid } = require('nanoid');
const bcrypt = require('bcryptjs');

const TABLA = 'user';
const TABLA_USER_ADDRESS = 'addresess';

module.exports = function(injectedStore){
    let store = injectedStore;
    if (!store) {
        store = require('../../store/mysql');
    }

    async function upsert(body) {
        const user = {
            first_name: body.first_name,
            last_name: body.last_name,
            username: body.username,
            photo: body.photo,
            score: body.score || '',
            password: await bcrypt.hash(body.password,5),
            creation_date: new Date(),
        }

        if (body.id) {
            user.UserID = body.id;
        } else {
            user.UserID = nanoid();
        }

        return await store.insert(TABLA, user);
    }

    async function list(){
        return await store.list(TABLA);
    }

    async function get(id){
        const query = `SELECT * FROM ${TABLA} WHERE UserID='${id}'`;
        //return await store.get(TABLA, id);
        return await store.get(query);
    }

    async function getAddr(id){
        //SELECT * FROM addresess INNER JOIN user ON addresess.UserID = user.UserID
        //SELECT * FROM addresess WHERE UserID='auPaaWgpllgm6OAIjh7-d'
        const query = `SELECT * FROM ${TABLA_USER_ADDRESS} WHERE UserID='${id}'`;
        //return await store.get(TABLA, id);
        return await store.get(query);
    }

    return {
        upsert,
        list,
        get,
        getAddr,
    }

}