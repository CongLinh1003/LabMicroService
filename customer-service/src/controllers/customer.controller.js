// customer-service/src/controllers/customer.controller.js
const customerService = require('../services/customer.service');

class CustomerController {
  async getAllCustomers(req, res) {
    try {
      const customers = await customerService.getAllCustomers();
      res.json(customers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getCustomerById(req, res) {
    try {
      const customer = await customerService.getCustomerById(req.params.id);
      res.json(customer);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async createCustomer(req, res) {
    try {
      const newCustomer = await customerService.createCustomer(req.body);
      res.status(201).json(newCustomer);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateCustomer(req, res) {
    try {
      const updatedCustomer = await customerService.updateCustomer(req.params.id, req.body);
      res.json(updatedCustomer);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteCustomer(req, res) {
    try {
      const deletedCustomer = await customerService.deleteCustomer(req.params.id);
      res.json(deletedCustomer);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new CustomerController();