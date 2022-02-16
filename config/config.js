import dotenv from 'dotenv';
// config() will read your .env file, parse the contents, assign it to process.env.
dotenv.config();

export default {
  login: process.env.LOGIN,
  password: process.env.PASSWORD,
  pageURL: process.env.PAGE_URL
}