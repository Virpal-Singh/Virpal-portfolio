#!/usr/bin/env node

// Script to set the correct API URL for deployment
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const apiUrl = args[0];

if (!apiUrl) {
  console.error('Usage: node scripts/set-api-url.js <API_URL>');
  console.error('Example: node scripts/set-api-url.js https://your-backend.onrender.com/api');
  process.exit(1);
}

const envPath = path.join(__dirname, '..', '.env.production');
const envContent = `# Production API URL
VITE_API_BASE_URL=${apiUrl}
REACT_APP_API_BASE_URL=${apiUrl}

# Admin email
VITE_ADMIN_EMAIL=77virpalsinh77@gmail.com
REACT_APP_ADMIN_EMAIL=77virpalsinh77@gmail.com
`;

fs.writeFileSync(envPath, envContent);
console.log(`✅ API URL set to: ${apiUrl}`);
console.log(`📝 Updated: ${envPath}`);