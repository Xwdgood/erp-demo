export const Customers = {
    render(data) {
      return `
        <div class="content-section active">
          <h2 class="section-title">Customer Management</h2>
          
          <div class="form-container">
            <h3>Add New Customer</h3>
            <div class="form-row">
              <div class="form-group">
                <label>Customer Name</label>
                <input type="text" id="customerName" placeholder="Enter customer name">
              </div>
              <div class="form-group">
                <label>Email</label>
                <input type="email" id="customerEmail" placeholder="customer@example.com">
              </div>
              <div class="form-group">
                <label>Phone</label>
                <input type="tel" id="customerPhone" placeholder="+1 (555) 123-4567">
              </div>
              <div class="form-group">
                <label>Company</label>
                <input type="text" id="customerCompany" placeholder="Company name">
              </div>
            </div>
            <button class="btn" id="addCustomerBtn">Add Customer</button>
          </div>
  
          <table class="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Company</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${this.renderCustomerRows(data)}
            </tbody>
          </table>
        </div>
      `;
    },
  
    renderCustomerRows(data) {
      return data.customers.map(customer => `
        <tr>
          <td>${customer.id}</td>
          <td>${customer.name}</td>
          <td>${customer.email}</td>
          <td>${customer.phone}</td>
          <td>${customer.company}</td>
          <td>
            <button class="btn btn-danger" data-delete-customer="${customer.id}">Delete</button>
          </td>
        </tr>
      `).join('');
    },
  
    init(data, refreshCallback) {
      // Add customer
      document.getElementById('addCustomerBtn').addEventListener('click', () => {
        this.addCustomer(data, refreshCallback);
      });
  
      // Delete customer
      document.querySelectorAll('[data-delete-customer]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const customerId = parseInt(e.target.getAttribute('data-delete-customer'));
          this.deleteCustomer(data, customerId, refreshCallback);
        });
      });
    },
  
    addCustomer(data, refreshCallback) {
      const name = document.getElementById('customerName').value;
      const email = document.getElementById('customerEmail').value;
      const phone = document.getElementById('customerPhone').value;
      const company = document.getElementById('customerCompany').value;
  
      if (name && email) {
        const customer = {
          id: data.nextCustomerId++,
          name,
          email,
          phone,
          company
        };
        data.customers.push(customer);
        refreshCallback();
      }
    },
  
    deleteCustomer(data, customerId, refreshCallback) {
      data.customers = data.customers.filter(customer => customer.id !== customerId);
      refreshCallback();
    }
  };