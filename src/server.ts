import { app } from './modules/api/infra/http/express/app';
import { initDb } from './modules/@shared/infra/db/sequelize';

const port = process.env.PORT || 3000;

// Initialize the database before starting the server
initDb().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch(error => {
  console.error('Failed to initialize database:', error);
  process.exit(1);
}); 