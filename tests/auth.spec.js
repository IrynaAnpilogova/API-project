import supertest from 'supertest';
import { expect } from 'chai';


describe('auth', function() {
    const request = supertest(process.env.BASE_URL);
    let result;

    describe('succesful log in', function() {
        before(function() {
            result = supertest(process.env.BASE_URL)
                .post('/auth')
                .send({ login: process.env.LOGIN, password: process.env.PASSWORD })
        });

        it('responce status code is 200', function() {
            result.expect(200);
        });

        it('responce body contains authorization token', function() {
            result.end(function(err, res) {
                expect(res.body.token).not.to.be.undefined
            });
        });

    });

    describe('log in with wrong credentials should return error', function() {

        before(function() {
            result = supertest(process.env.BASE_URL)
                .post('/auth')
                .send({
                    login: 'wrong',
                    password: 'wrong'
                })
        });

        it('responce status code is 404', function() {
            result.expect(404);
        });

        it('responce body contains error message', function() {
            result.end(function(err, res) {
                expect(res.body.message).to.eq('Wrong login or password')

            });
        });
    });

});