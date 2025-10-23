import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Validate required environment variables
const requiredEnvVars = ['BASE_URL', 'USER_EMAIL', 'USER_PASSWORD'];

requiredEnvVars.forEach(envVar => {
  if (!process.env[envVar]) {
    throw new Error(`Required environment variable ${envVar} is missing`);
  }
});

export const env = {
  baseUrl: process.env.BASE_URL!,
  userEmail: process.env.USER_EMAIL!,
  userPassword: process.env.USER_PASSWORD!
};