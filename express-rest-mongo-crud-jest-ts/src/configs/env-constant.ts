import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

const envFile = path.resolve(process.cwd(), `.env.${process.env.NODE_ENV || ''}`);

if (!fs.existsSync(envFile)) {
	throw new Error(`${envFile} is not found`);
}

dotenv.config({
	path: envFile,
	override: process.env.NODE_ENV === 'test'
});


export const PORT = process.env.PORT || '5001';
export const MONGODB_HOST = process.env.MONGODB_HOST || '127.0.0.1';
export const MONGODB_PORT = process.env.MONGODB_PORT || '27017';
export const MONGODB_AUTH_SOURCE = process.env.MONGODB_AUTH_SOURCE;
export const MONGODB_USERNAME = process.env.MONGODB_USERNAME;
export const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
export const MONGODB_DATABASE = process.env.MONGODB_DATABASE;