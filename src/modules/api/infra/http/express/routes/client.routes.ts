import { Router } from 'express';
import { ClientController } from '../controllers/client.controller';

const router = Router();
const clientController = new ClientController();

router.post('/', clientController.create);

export { router as clientRoutes }; 