// customer-service/src/services/customer.service.js
const customerModel = require('../models/Customer');

class CustomerService {
  async getAllCustomers() {
    return await customerModel.getAllCustomers();
  }

  async getCustomerById(id) {
    const customer = await customerModel.getCustomerById(id);
    if (!customer) {
      throw new Error('Customer not found');
    }
    return customer;
  }

  async createCustomer(customerData) {
    if (!customerData.name || !customerData.email) {
      throw new Error('Name and email are required');
    }
    return await customerModel.createCustomer(customerData);
  }

  async updateCustomer(id, customerData) {
    const existingCustomer = await customerModel.getCustomerById(id);
    if (!existingCustomer) {
      throw new Error('Customer not found');
    }
    return await customerModel.updateCustomer(id, customerData);
  }

  async deleteCustomer(id) {
    const existingCustomer = await customerModel.getCustomerById(id);
    if (!existingCustomer) {
      throw new Error('Customer not found');
    }
    return await customerModel.deleteCustomer(id);
  }
}

module.exports = new CustomerService();