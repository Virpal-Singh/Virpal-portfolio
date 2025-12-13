// API Configuration
const getApiBaseUrl = () => {
  // Check for Vite environment variables first (production builds)
  if (import.meta.env.VITE_API_BASE_URL) {
    console.log('Using VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);
    return import.meta.env.VITE_API_BASE_URL;
  }
  
  // Fallback to React environment variables (legacy support)
  if (typeof process !== 'undefined' && process.env && process.env.REACT_APP_API_BASE_URL) {
    console.log('Using REACT_APP_API_BASE_URL:', process.env.REACT_APP_API_BASE_URL);
    return process.env.REACT_APP_API_BASE_URL;
  }
  
  // Production fallback - if we're not on localhost, use the production API
  if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    // Use build-time constant if available, otherwise fallback to hardcoded URL
    const productionUrl = typeof __API_BASE_URL__ !== 'undefined' ? __API_BASE_URL__ : 'https://virpal-portfolio.onrender.com/api';
    console.log('Using production fallback URL:', productionUrl);
    return productionUrl;
  }
  
  // Default to localhost for development
  console.log('Using development URL: http://localhost:5000/api');
  return 'http://localhost:5000/api';
};

export const API_CONFIG = {
  BASE_URL: getApiBaseUrl(),
  TIMEOUT: 10000, // 10 seconds
};

export default API_CONFIG;