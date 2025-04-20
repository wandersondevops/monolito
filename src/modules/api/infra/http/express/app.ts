import express from 'express';
import cors from 'cors';
import { productRoutes } from './routes/product.routes';
import { clientRoutes } from './routes/client.routes';
import { checkoutRoutes } from './routes/checkout.routes';
import { invoiceRoutes } from './routes/invoice.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/products', productRoutes);
app.use('/clients', clientRoutes);
app.use('/checkout', checkoutRoutes);
app.use('/invoice', invoiceRoutes);

export { app }; 