export const Inventory = {
    render(data) {
      return `
        <div class="content-section active">
          <h2 class="section-title">Inventory Management</h2>
          
          <div class="form-container">
            <h3>Add New Product</h3>
            <div class="form-row">
              <div class="form-group">
                <label>Product Name</label>
                <input type="text" id="productName" placeholder="Enter product name">
              </div>
              <div class="form-group">
                <label>Category</label>
                <select id="productCategory">
                  <option value="Electronics">Electronics</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Books">Books</option>
                  <option value="Home">Home & Garden</option>
                </select>
              </div>
              <div class="form-group">
                <label>Price ($)</label>
                <input type="number" id="productPrice" placeholder="0.00" step="0.01">
              </div>
              <div class="form-group">
                <label>Stock Quantity</label>
                <input type="number" id="productStock" placeholder="0">
              </div>
            </div>
            <button class="btn" id="addProductBtn">Add Product</button>
          </div>
  
          <table class="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${this.renderProductRows(data)}
            </tbody>
          </table>
        </div>
      `;
    },
  
    renderProductRows(data) {
      return data.products.map(product => `
        <tr>
          <td>${product.id}</td>
          <td>${product.name}</td>
          <td>${product.category}</td>
          <td>$${product.price.toFixed(2)}</td>
          <td>${product.stock}</td>
          <td><span class="status-badge ${this.getStockStatus(product.stock)}">${this.getStockLabel(product.stock)}</span></td>
          <td>
            <button class="btn btn-danger" data-delete-product="${product.id}">Delete</button>
          </td>
        </tr>
      `).join('');
    },
  
    getStockStatus(stock) {
      if (stock < 10) return 'status-low';
      if (stock < 50) return 'status-medium';
      return 'status-high';
    },
  
    getStockLabel(stock) {
      if (stock < 10) return 'Low Stock';
      if (stock < 50) return 'Medium Stock';
      return 'In Stock';
    },
  
    init(data, refreshCallback) {
      // Add product
      document.getElementById('addProductBtn').addEventListener('click', () => {
        this.addProduct(data, refreshCallback);
      });
  
      // Delete product
      document.querySelectorAll('[data-delete-product]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const productId = parseInt(e.target.getAttribute('data-delete-product'));
          this.deleteProduct(data, productId, refreshCallback);
        });
      });
    },
  
    addProduct(data, refreshCallback) {
      const name = document.getElementById('productName').value;
      const category = document.getElementById('productCategory').value;
      const price = parseFloat(document.getElementById('productPrice').value);
      const stock = parseInt(document.getElementById('productStock').value);
  
      if (name && price && stock) {
        const product = {
          id: data.nextProductId++,
          name,
          category,
          price,
          stock
        };
        data.products.push(product);
        refreshCallback();
      }
    },
  
    deleteProduct(data, productId, refreshCallback) {
      data.products = data.products.filter(product => product.id !== productId);
      refreshCallback();
    }
  };