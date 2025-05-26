import './styles/main.css'
import { initApp } from './utils/helpers.js'
import { mockData } from './data/mockData.js'

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  initApp(mockData);
});