// product-service/src/controllers/product.controller.js
const productService = require('../services/product.service');

class ProductController {
  async getAllProducts(req, res) {
    try {
      const products = await productService.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getProductById(req, res) {
    try {
      const product = await productService.getProductById(req.params.id);
      res.json(product);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async createProduct(req, res) {
    try {
      const newProduct = await productService.createProduct(req.body);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateProduct(req, res) {
    try {
      const updatedProduct = await productService.updateProduct(req.params.id, req.body);
      res.json(updatedProduct);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteProduct(req, res) {
    try {
      const deletedProduct = await productService.deleteProduct(req.params.id);
      res.json(deletedProduct);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async checkStock(req, res) {
    try {
      const { quantity = 1 } = req.query;
      const isAvailable = await productService.checkStock(req.params.id, parseInt(quantity));
      res.json({ inStock: isAvailable });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new ProductController();