import { Dashboard } from '../components/Dashboard.js';
import { Inventory } from '../components/Inventory.js';
import { Customers } from '../components/Customers.js';
import { Orders } from '../components/Orders.js';

let appData = {
  products: [],
  customers: [],
  orders: [],
  nextProductId: 1,
  nextCustomerId: 1,
  nextOrderId: 1
};

export function initApp(mockData) {
  // Initialize data
  appData.products = [...mockData.products];
  appData.customers = [...mockData.customers];
  appData.orders = [...mockData.orders];
  appData.nextProductId = Math.max(...appData.products.map(p => p.id)) + 1;
  appData.nextCustomerId = Math.max(...appData.customers.map(c => c.id)) + 1;
  appData.nextOrderId = Math.max(...appData.orders.map(o => o.id)) + 1;

  // Create navigation
  createNavigation();
  
  // Show dashboard by default
  showSection('dashboard');
}

function createNavigation() {
  const navContainer = document.getElementById('nav-container');
  navContainer.innerHTML = `
    <div class="nav-tabs">
      <button class="nav-tab active" data-section="dashboard">📊 Dashboard</button>
      <button class="nav-tab" data-section="inventory">📦 Inventory</button>
      <button class="nav-tab" data-section="customers">👥 Customers</button>
      <button class="nav-tab" data-section="orders">🛒 Orders</button>
    </div>
  `;

  // Add event listeners
  navContainer.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      const section = e.target.getAttribute('data-section');
      showSection(section);
      
      // Update active tab
      navContainer.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
      e.target.classList.add('active');
    });
  });
}

export function showSection(sectionName) {
  const contentContainer = document.getElementById('content-container');
  
  switch(sectionName) {
    case 'dashboard':
      contentContainer.innerHTML = Dashboard.render(appData);
      Dashboard.init(appData);
      break;
    case 'inventory':
      contentContainer.innerHTML = Inventory.render(appData);
      Inventory.init(appData, refreshData);
      break;
    case 'customers':
      contentContainer.innerHTML = Customers.render(appData);
      Customers.init(appData, refreshData);
      break;
    case 'orders':
      contentContainer.innerHTML = Orders.render(appData);
      Orders.init(appData, refreshData);
      break;
  }
}

function refreshData() {
  // This function can be called by components to refresh data
  const activeTab = document.querySelector('.nav-tab.active');
  if (activeTab) {
    const section = activeTab.getAttribute('data-section');
    showSection(section);
  }
}

export { appData };