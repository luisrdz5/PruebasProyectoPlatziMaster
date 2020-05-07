const { nanoid } = require('nanoid');
const bcrypt = require('bcryptjs');

const TABLA = 'user';

module.exports = function(injectedStore){
    let store = injectedStore;
    if (!store) {
        store = require('../../../../mysql/mysql');
    }

    async function upsert(body) {
        const user = {
            name: body.name,
            username: body.username,
            password: await bcrypt.hash(body.password,5),
        }

        if (body.id) {
            user.id = body.id;
        } else {
            user.id = nanoid();
        }

        return store.insert(TABLA, user);
    }

    return {
        upsert,
    }

}