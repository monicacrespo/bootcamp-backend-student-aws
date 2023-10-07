// dotenv library to be OS agnostic
import { config } from 'dotenv';
// Loads .env file contents into process.env
config();

require('./app');