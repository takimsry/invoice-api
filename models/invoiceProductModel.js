import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import Invoice from './invoiceModel.js';
import Product from './productModel.js';

const InvoiceProduct = sequelize.define('InvoiceProduct', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  invoice_id: {
    type: DataTypes.UUID,
    references: {
      model: 'Invoices',
      key: 'id'
    }
  },
  product_id: {
    type: DataTypes.UUID,
    references: {
      model: 'Products',
      key: 'id'
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: true
});

InvoiceProduct.belongsTo(Invoice, { foreignKey: 'invoice_id' });
InvoiceProduct.belongsTo(Product, { foreignKey: 'product_id' });

export default InvoiceProduct;