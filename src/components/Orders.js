export const Orders = {
    render(data) {
      return `
        <div class="content-section active">
          <h2 class="section-title">Order Management</h2>
          
          <div class="form-container">
            <h3>Create New Order</h3>
            <div class="form-row">
              <div class="form-group">
                <label>Customer</label>
                <select id="orderCustomer">
                  <option value="">Select Customer</option>
                  ${this.renderCustomerOptions(data)}
                </select>
              </div>
              <div class="form-group">
                <label>Product</label>
                <select id="orderProduct">
                  <option value="">Select Product</option>
                  ${this.renderProductOptions(data)}
                </select>
              </div>
              <div class="form-group">
                <label>Quantity</label>
                <input type="number" id="orderQuantity" placeholder="1" min="1">
              </div>
              <div class="form-group">
                <label>Status</label>
                <select id="orderStatus">
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
            <button class="btn" id="addOrderBtn">Create Order</button>
          </div>
  
          <table class="table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${this.renderOrderRows(data)}
            </tbody>
          </table>
        </div>
      `;
    },
  
    renderCustomerOptions(data) {
      return data.customers.map(customer => 
        `<option value="${customer.id}">${customer.name}</option>`
      ).join('');
    },
  
    renderProductOptions(data) {
      return data.products.map(product => 
        `<option value="${product.id}">${product.name} ($${product.price})</option>`
      ).join('');
    },
  
    renderOrderRows(data) {
      return data.orders.map(order => {
        const customer = data.customers.find(c => c.id === order.customerId);
        const product = data.products.find(p => p.id === order.productId);
        
        return `
          <tr>
            <td>${order.id}</td>
            <td>${customer ? customer.name : 'Unknown'}</td>
            <td>${product ? product.name : 'Unknown'}</td>
            <td>${order.quantity}</td>
            <td>$${order.total.toFixed(2)}</td>
            <td><span class="status-badge status-${order.status}">${order.status}</span></td>
            <td>${order.date}</td>
            <td>
              <select data-update-status="${order.id}">
                <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
                <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>Completed</option>
                <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
              </select>
              <button class="btn btn-danger" data-delete-order="${order.id}">Delete</button>
            </td>
          </tr>
        `;
      }).join('');
    },
  
    init(data, refreshCallback) {
      // Add order
      document.getElementById('addOrderBtn').addEventListener('click', () => {
        this.addOrder(data, refreshCallback);
      });
  
      // Delete order
      document.querySelectorAll('[data-delete-order]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const orderId = parseInt(e.target.getAttribute('data-delete-order'));
          this.deleteOrder(data, orderId, refreshCallback);
        });
      });
  
      // Update order status
      document.querySelectorAll('[data-update-status]').forEach(select => {
        select.addEventListener('change', (e) => {
          const orderId = parseInt(e.target.getAttribute('data-update-status'));
          const newStatus = e.target.value;
          this.updateOrderStatus(data, orderId, newStatus, refreshCallback);
        });
      });
    },
  
    addOrder(data, refreshCallback) {
      const customerId = parseInt(document.getElementById('orderCustomer').value);
      const productId = parseInt(document.getElementById('orderProduct').value);
      const quantity = parseInt(document.getElementById('orderQuantity').value);
      const status = document.getElementById('orderStatus').value;
  
      if (customerId && productId && quantity) {
        const product = data.products.find(p => p.id === productId);
        if (product && product.stock >= quantity) {
          const order = {
            id: data.nextOrderId++,
            customerId,
            productId,
            quantity,
            status,
            date: new Date().toISOString().split('T')[0],
            total: product.price * quantity
          };
          data.orders.push(order);
          
          // Update product stock
          product.stock -= quantity;
          
          refreshCallback();
        } else {
          alert('Insufficient stock!');
        }
      }
    },
  
    deleteOrder(data, orderId, refreshCallback) {
      const order = data.orders.find(o => o.id === orderId);
      if (order) {
        const product = data.products.find(p => p.id === order.productId);
        if (product) {
          product.stock += order.quantity; // Restore stock
        }
        data.orders = data.orders.filter(o => o.id !== orderId);
        refreshCallback();
      }
    },
  
    updateOrderStatus(data, orderId, newStatus, refreshCallback) {
      const order = data.orders.find(o => o.id === orderId);
      if (order) {
        order.status = newStatus;
        refreshCallback();
      }
    }
  };