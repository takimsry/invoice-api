import Product from "../models/productModel.js";

export const createProduct = async (req, res) => {
  const { name, image, stock, price } = req.body;

  if(!name || !image || !stock || !price) {
    return res.status(400).json({ success:false, message: "Please provide all fields" });
  }

  try {
    const newProduct = await Product.create({ name, image, stock, price });
    res.status(201).json({ success: true, message: "Product created successfully", data: newProduct }); 
  } catch (error) { 
    console.error("Error creating product:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("Error getting products:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, image, stock, price } = req.body;

  if (!name && !price && !image && !stock) {
    return res.status(400).json({ success: false, message: "Please provide at least one field to update" });
  }

  try {
    const [updated] = await Product.update({ name, image, stock, price }, { where: { id } });
    if(updated) {
      const updatedProduct = await Product.findByPk(id);
      return res.status(200).json({ success: true, message: "Product updated successfully", data: updatedProduct });
    }
    return res.status(404).json({ success: false, message: "Product not found" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
}

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  
  try {
    const deleted = await Product.destroy({ where: { id } });
    if(deleted) {
      return res.status(200).json({ success: true, message: "Product deleted successfully" });
    }
    return res.status(404).json({ success: false, message: "Product not found" });
  } catch (error) {
    console.log("Error deleting product:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
}