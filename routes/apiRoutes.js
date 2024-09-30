import express from 'express';
import { createProduct, deleteProduct, getProducts, updateProduct } from '../controllers/productController.js';
import { createInvoice, getInvoices } from '../controllers/invoiceController.js';

const router = express.Router();

// Product Routes
router.post("/products", createProduct);
router.get("/products", getProducts);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

// Invoice Routes
router.post("/invoices", createInvoice);
router.get("/invoices", getInvoices);

// Revenue Routes

export default router;