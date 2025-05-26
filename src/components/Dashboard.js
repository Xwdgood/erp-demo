export const Dashboard = {
    render(data) {
      const totalRevenue = data.orders.reduce((sum, order) => sum + order.total, 0);
      
      return `
        <div class="content-section active">
          <h2 class="section-title">Dashboard Overview</h2>
          <div class="stats-grid">
            <div class="stat-card">
              <h3>${data.products.length}</h3>
              <p>Total Products</p>
            </div>
            <div class="stat-card">
              <h3>${data.customers.length}</h3>
              <p>Total Customers</p>
            </div>
            <div class="stat-card">
              <h3>${data.orders.length}</h3>
              <p>Total Orders</p>
            </div>
            <div class="stat-card">
              <h3>$${totalRevenue.toFixed(2)}</h3>
              <p>Total Revenue</p>
            </div>
          </div>
          
          <div class="quick-actions">
            <button class="btn" data-action="inventory">Manage Inventory</button>
            <button class="btn" data-action="customers">View Customers</button>
            <button class="btn" data-action="orders">Process Orders</button>
          </div>
  
          <div class="recent-activity">
            <h3>Recent Orders</h3>
            <table class="table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                ${this.renderRecentOrders(data)}
              </tbody>
            </table>
          </div>
        </div>
      `;
    },
  
    renderRecentOrders(data) {
      return data.orders.slice(-5).map(order => {
        const customer = data.customers.find(c => c.id === order.customerId);
        return `
          <tr>
            <td>${order.id}</td>
            <td>${customer ? customer.name : 'Unknown'}</td>
            <td>$${order.total.toFixed(2)}</td>
            <td><span class="status-badge status-${order.status}">${order.status}</span></td>
            <td>${order.date}</td>
          </tr>
        `;
      }).join('');
    },
  
    init(data) {
      // Add event listeners for quick actions
      document.querySelectorAll('[data-action]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const action = e.target.getAttribute('data-action');
          const targetTab = document.querySelector(`[data-section="${action}"]`);
          if (targetTab) {
            targetTab.click();
          }
        });
      });
    }
  };