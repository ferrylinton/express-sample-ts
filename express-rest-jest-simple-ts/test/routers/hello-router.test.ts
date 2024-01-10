import assert from 'assert';
import request from 'supertest';
import app from '../../src/app';
import { getMessage } from '../../src/services/hello-service';


describe('/api/todoes', () => {

    describe('GET /api?name', function () {

        it('should return a message', async function () {
            const name = 'ferry';
            const response = await request(app)
                .get(`/api?name=${name}`)
                .set('Accept', 'application/json')
                .expect(200);
            assert(response.body.message, getMessage(name));
        });

    });

    describe('GET /api', function () {

        it('should return error', async function () {
            const response = await request(app)
                .get(`/api`)
                .set('Accept', 'application/json')
                .expect(500);
            assert(response.body.message, 'Name is empty');
        });

    });

})