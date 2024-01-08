import { DeleteResult, InsertOneResult, ObjectId, UpdateResult } from 'mongodb';
import request from 'supertest';
import app from '@/app';
import { Todo, UpdateTodo } from '@/types/todo-type';

const _id: string = '659a255e868375640fb37e20';

jest.mock('@/services/todo-service', () => ({
    create: jest.fn((task: string): Promise<InsertOneResult> => {
        return new Promise((resolve, reject) => {
            if (task === 'error') {
                reject(new Error('Test Error'));
            } else {
                resolve({
                    acknowledged: true,
                    insertedId: new ObjectId(_id)
                })
            }
        });
    }),

    findById: jest.fn((_id: string): Promise<Todo | null> => {
        return new Promise((resolve, reject) => {
            if (_id === '659a255e868375640fb37e20') {
                resolve({
                    _id: new ObjectId(_id),
                    task: 'Test',
                    done: false,
                    createdAt: new Date(),
                    updatedAt: null
                })
            } else {
                resolve(null);
            }
        });
    }),

    find: jest.fn((): Promise<Todo[]> => {
        return new Promise((resolve, reject) => {
            const todoes: Todo[] = [{
                _id: new ObjectId(_id),
                task: 'Test',
                done: false,
                createdAt: new Date(),
                updatedAt: null
            }];

            resolve(todoes);
        });
    }),

    update: jest.fn((_id: string, _updateTodo: UpdateTodo): Promise<UpdateResult<Todo>> => {
        return new Promise((resolve, reject) => {
            const updateResult: UpdateResult = {
                acknowledged: true,
                matchedCount: 1,
                modifiedCount: 1,
                upsertedCount: 0,
                upsertedId: new ObjectId(_id)
            };

            resolve(updateResult);
        });
    }),

    deleteById: jest.fn((_id: string): Promise<DeleteResult> => {
        return new Promise((resolve, reject) => {
            const deleteResult: DeleteResult = {
                acknowledged: true,
                deletedCount: 1
            };

            resolve(deleteResult);
        });
    }),


}));

afterAll(async () => {
    jest.clearAllMocks();
});

describe('/api/todoes', () => {

    describe('POST /api/todoes', function () {

        it('should create a task', async function () {
            const response = await request(app)
                .post('/api/todoes')
                .send({ task: 'test' })
                .set('Accept', 'application/json')
                .expect(201);
            expect(response.body.insertedId).toBe('659a255e868375640fb37e20');
        });

        it('should throw error', async function () {
            const response = await request(app)
                .post('/api/todoes')
                .send({ task: 'error' })
                .set('Accept', 'application/json')
                .expect(500);
            expect(response.body.message).toBe('Test Error');
        });

    });

    describe('GET /api/todoes/:_id', function () {

        it('should return a task', async function () {
            const response = await request(app)
                .get('/api/todoes/' + _id)
                .set('Accept', 'application/json')
                .expect(200);
            expect(response.body._id).toBe(_id);
        });

        it('task is not found', async function () {
            const response = await request(app)
                .get('/api/todoes/xxxxxx')
                .set('Accept', 'application/json')
                .expect(404);
            expect(response.body.message).toBe('Data is not found');
        });

    });

    describe('GET /api/todoes/', function () {

        it('should return list of tasks', async function () {
            const response = await request(app)
                .get(`/api/todoes`)
                .set('Accept', 'application/json')
                .expect(200);
            expect(response.body.length).toBe(1);
        });

    });

    describe('PUT /api/todoes/:_id', function () {

        it('should update task', async function () {
            const response = await request(app)
                .put('/api/todoes/' + _id)
                .send({ task: 'test update' })
                .set('Accept', 'application/json')
                .expect(200);
            expect(response.body.modifiedCount).toBe(1);
        });

    });

    describe('DELETE /api/todoes/:_id', function () {

        it('should update task', async function () {
            const response = await request(app)
                .delete('/api/todoes/' + _id)
                .set('Accept', 'application/json')
                .expect(200);
            expect(response.body.deletedCount).toBe(1);
        });

    });

})