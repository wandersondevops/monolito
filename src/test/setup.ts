import { app } from '../modules/api/infra/http/express/app';
import supertest from 'supertest';
import { initDb } from '../modules/@shared/infra/db/sequelize';

// Initialize the database before running tests
beforeAll(async () => {
  await initDb();
});

// Note: We're not closing the database connection here anymore
// The Jest configuration will handle this with forceExit: true

// Create a supertest agent
export const request = supertest(app); 