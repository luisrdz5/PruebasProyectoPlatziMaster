const chai = require('chai');
const chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

const server = require('../src/server');

describe('user', ()=> {
    describe('/GET users', ()=> {
        it('it should GET all the users', (done) => {
            chai.request(server)
                .get('/api/user')
                .end( (err, res) => {
                    (res).should.have.status(200);
                    (res.body).should.be.a('object');
                    done();
                });
        });
    });

    describe('/GET one user by id', () => {
        const id = 'PeJbzjBNiazWgvtWDPBtC';
        it('it should GET the user with the right id', (done) => {
            chai.request(server)
                .get(`/api/user/${id}`)
                .end( (err, res) => {
                    (res).should.have.status(200);
                    (res.body).should.be.a('object');
                    (res.body.body.length).should.be.eql(1);
                    done();
                });
        });
    });
});

    describe('Products', ()=> {
        describe('/GET products', ()=> {
            it('it should GET all the products', (done) => {
                chai.request(server)
                    .get('/api/products')
                    .end( (err, res) => {
                        (res).should.have.status(200);
                        (res.body).should.be.a('object');
                        done();
                    });
            });
        });
    
        describe('/GET one product by id', () => {
            const id = 'RW0s0ko2MVngmIksoIxXB';
            it('it should GET the product with the right id', (done) => {
                chai.request(server)
                    .get(`/api/products/${id}`)
                    .end( (err, res) => {
                        (res).should.have.status(200);
                        (res.body).should.be.a('object');
                        (res.body.body.length).should.be.eql(1);
                        done();
                    });
            });
        });
});