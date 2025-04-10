// product-service/src/services/product.service.js
const productModel = require('../models/Product');

class ProductService {
  async getAllProducts() {
    return await productModel.getAllProducts();
  }

  async getProductById(id) {
    const product = await productModel.getProductById(id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  async createProduct(productData) {
    if (!productData.name || !productData.price) {
      throw new Error('Name and price are required');
    }
    return await productModel.createProduct(productData);
  }

  async updateProduct(id, productData) {
    const existingProduct = await productModel.getProductById(id);
    if (!existingProduct) {
      throw new Error('Product not found');
    }
    return await productModel.updateProduct(id, productData);
  }

  async deleteProduct(id) {
    const existingProduct = await productModel.getProductById(id);
    if (!existingProduct) {
      throw new Error('Product not found');
    }
    return await productModel.deleteProduct(id);
  }

  async checkStock(productId, quantity) {
    return await productModel.checkStock(productId, quantity);
  }
}

module.exports = new ProductService();