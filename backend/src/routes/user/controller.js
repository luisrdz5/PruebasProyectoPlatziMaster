const { nanoid } = require('nanoid');
const bcrypt = require('bcryptjs');

const TABLA = 'user';

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
            user.id = body.id;
        } else {
            user.id = nanoid();
        }

        return await store.insert(TABLA, user);
    }

    async function list(){
        return await store.list(TABLA);
    }

    return {
        upsert,
        list,
    }

}