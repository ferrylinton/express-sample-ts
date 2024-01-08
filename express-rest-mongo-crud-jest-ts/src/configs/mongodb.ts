import { Db, Document, MongoClient, MongoClientOptions, TransactionOptions } from 'mongodb';
import { MONGODB_AUTH_SOURCE, MONGODB_DATABASE, MONGODB_PASSWORD, MONGODB_HOST, MONGODB_PORT, MONGODB_USERNAME } from '@/configs/env-constant';


const mongoClientOptions: MongoClientOptions = {
    authMechanism: "DEFAULT",
    authSource: MONGODB_AUTH_SOURCE,
    monitorCommands: true,
    connectTimeoutMS: 15000,
    socketTimeoutMS: 15000,
    auth: {
        username: MONGODB_USERNAME,
        password: MONGODB_PASSWORD
    }
};

export const transactionOptions: TransactionOptions = {
    readConcern: { level: 'snapshot' },
    writeConcern: { w: 'majority' },
    readPreference: 'primary'
};

/**
 * @type {Promise<MongoClient>}
 */
let mongoClient: Promise<MongoClient>;

const getMongoClientInstance = () => {
    try {
        /**
         * @constant {string} mongodbURL
         */
        const mongodbURL = `mongodb://${MONGODB_HOST}:${MONGODB_PORT}`;
        const instance = new MongoClient(mongodbURL, mongoClientOptions);

        instance.on('connectionPoolCreated', (event) => console.log(`[MONGODB] ${JSON.stringify(event)}`));
        instance.on('connectionPoolReady', (event) => console.log(`[MONGODB] ${JSON.stringify(event)}`));
        instance.on('connectionCreated', (event) => console.log(`[MONGODB] ${JSON.stringify(event)}`));
        instance.on('connectionClosed', (event) => console.log(`[MONGODB] ${JSON.stringify(event)}`));

        return instance;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getMongoClient = async () => {
    if (mongoClient) {
        return mongoClient;
    } else {
        mongoClient = getMongoClientInstance().connect();
        return mongoClient;
    }
};

export const getDb = async () => {
    const connection = await getMongoClient();
    return connection.db(MONGODB_DATABASE);
}

export const getCollection = async <TSchema extends Document = Document>(name: string, db?: Db) => {
    if (db) {
        return db.collection<TSchema>(name);
    } else {
        const db = await getDb();
        return db.collection<TSchema>(name);
    }
}
