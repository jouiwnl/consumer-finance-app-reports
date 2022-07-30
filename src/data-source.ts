import "reflect-metadata"
import { DataSource } from "typeorm"
import { Report } from './entity/Report';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: 5432,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    logging: false,
    extra: {
        ssl: {
            rejectUnauthorized: false
        }
    },
    entities: [
        Report
    ],
    migrations: [],
    subscribers: [],
})
