import assert from 'assert';
import request from 'supertest';
import app from '../src/app';
import { getMessage } from '../src/services/hello-service';


describe('app', () => {

    describe('GET /api/notfound', function () {

        it('should return 404', async function () {
            const response = await request(app)
                .get(`/api/notfound`)
                .set('Accept', 'application/json')
                .expect(404);
            assert(response.body.message, 'Not Found');
        });

    });

})