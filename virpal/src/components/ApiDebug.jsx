import { API_CONFIG } from '../config/api.js';

const ApiDebug = () => {
  const handleTestApi = async () => {
    try {
      console.log('Current API Base URL:', API_CONFIG.BASE_URL);
      console.log('Environment variables:');
      console.log('VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);
      console.log('Window location:', window.location.href);
      
      // Test a simple API call
      const response = await fetch(`${API_CONFIG.BASE_URL}/health`);
      console.log('API Health Check Response:', response.status);
    } catch (error) {
      console.error('API Test Error:', error);
    }
  };

  // Only show in development
  if (import.meta.env.MODE === 'production') {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      left: '10px',
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '12px',
      zIndex: 9999
    }}>
      <div>API URL: {API_CONFIG.BASE_URL}</div>
      <button onClick={handleTestApi} style={{marginTop: '5px'}}>
        Test API
      </button>
    </div>
  );
};

export default ApiDebug;