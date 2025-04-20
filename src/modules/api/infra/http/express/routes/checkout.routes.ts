import { Router } from 'express';
import { CheckoutController } from '../controllers/checkout.controller';

const router = Router();
const checkoutController = new CheckoutController();

router.post('/', checkoutController.create);

export { router as checkoutRoutes }; 