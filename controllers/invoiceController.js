import Invoice from "../models/invoiceModel.js";
import InvoiceProduct from "../models/invoiceProductModel.js";
import Product from '../models/productModel.js';

export const createInvoice = async (req, res) => {
  const { date, customer_name, salesperson_name, products, notes } = req.body;

  if (!date || !customer_name || !salesperson_name || !products || products.length === 0) {
    return res.status(400).json({ success: false, message: "Please provide all required fields and at least one product." });
  }

  
  try {
    const newInvoice = await Invoice.create({
      date,
      customer_name,
      salesperson_name,
      total_amount: 0,
      notes
    });

    let totalAmount = 0;

    const invoiceProducts = await Promise.all(products.map(async (product) => {
      const { product_id, quantity } = product;

      const existingProduct = await Product.findByPk(product_id);
      if (!existingProduct) {
        throw new Error(`Product with ID ${product_id} not found`);
      }

      totalAmount += existingProduct.price * quantity;

      return {
        invoice_id: newInvoice.id,
        product_id,
        quantity
      };
    }));

    await InvoiceProduct.bulkCreate(invoiceProducts);

    newInvoice.total_amount = totalAmount;
    await newInvoice.save();

    res.status(201).json({ success: true, message: "Invoice created successfully", data: newInvoice });

  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating invoice", error: error.message });
  }
};

export const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.findAll();
    res.status(200).json({ success: true, data: invoices });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error getting invoices", error: error.message });
  }
};