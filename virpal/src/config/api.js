// API Configuration
const getApiBaseUrl = () => {
  // Check for Vite environment variables first
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  
  // Fallback to React environment variables
  if (process.env.REACT_APP_API_BASE_URL) {
    return process.env.REACT_APP_API_BASE_URL;
  }
  
  // Auto-detect based on current domain in production
  if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    // If deployed, try to construct API URL from current domain
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    
    // Common patterns for backend URLs
    const possibleUrls = [
      `${protocol}//${hostname.replace('www.', '')}/api`, // Same domain
      `${protocol}//api.${hostname.replace('www.', '')}/api`, // API subdomain
      `${protocol}//${hostname.replace('www.', '')}-api.onrender.com/api`, // Render pattern
    ];
    
    // For now, return the first pattern - you can customize this
    return possibleUrls[0];
  }
  
  // Default to localhost for development
  return 'http://localhost:5000/api';
};

export const API_CONFIG = {
  BASE_URL: getApiBaseUrl(),
  TIMEOUT: 10000, // 10 seconds
};

export default API_CONFIG;