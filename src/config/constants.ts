import { config } from 'dotenv';

config();

export const {
    DB_CONN,
    SECRET_KEY
} = process.env as {
    [key: string]: string
}