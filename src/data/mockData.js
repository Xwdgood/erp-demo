export const mockData = {
    products: [
      { id: 1, name: 'Laptop', category: 'Electronics', price: 999.99, stock: 50 },
      { id: 2, name: 'T-Shirt', category: 'Clothing', price: 19.99, stock: 100 },
      { id: 3, name: 'JavaScript Book', category: 'Books', price: 29.99, stock: 25 }
    ],
    customers: [
      { id: 1, name: 'John Smith', email: 'john@example.com', phone: '+1-555-0123', company: 'Tech Corp' },
      { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', phone: '+1-555-0124', company: 'Design LLC' }
    ],
    orders: [
      { id: 1, customerId: 1, productId: 1, quantity: 2, status: 'completed', date: '2024-01-15', total: 1999.98 },
      { id: 2, customerId: 2, productId: 2, quantity: 5, status: 'pending', date: '2024-01-16', total: 99.95 }
    ]
  };