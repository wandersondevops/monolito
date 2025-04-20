import { Router } from 'express';
import { InvoiceController } from '../controllers/invoice.controller';

const router = Router();
const invoiceController = new InvoiceController();

router.get('/:id', invoiceController.find);

export { router as invoiceRoutes }; 