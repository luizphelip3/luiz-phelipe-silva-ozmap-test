require('dotenv').config({ path: `.env` });

export const DB_PORT = process.env.DB_PORT;
export const API_PORT = process.env.API_PORT;
export const MONGODB_URI = process.env.MONGODB_URI;
export const DB_NAME = process.env.DB_NAME;
export const DB_USER = process.env.DB_USER;
export const DB_PASS = process.env.DB_PASS;
export const GOOGLE_GEOCODING_API_KEY = process.env.GOOGLE_GEOCODING_API_KEY;
export const GEOCODING_REVERSE_URL = process.env.GOOGLE_GEOCODING_REVERSE_URL;
export const GEOCODING_URL = process.env.GOOGLE_GEOCODING_URL;
