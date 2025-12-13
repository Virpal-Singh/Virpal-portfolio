#!/usr/bin/env node

// Script to set the correct API URL for deployment
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);
const apiUrl = args[0];

if (!apiUrl) {
  console.error('Usage: node scripts/set-api-url.js <API_URL>');
  console.error('Example: node scripts/set-api-url.js https://your-backend.onrender.com/api');
  process.exit(1);
}

const envPath = path.join(__dirname, '..', '.env.production');
// Ensure the API URL has /api at the end if not present
const normalizedUrl = apiUrl.endsWith('/api') ? apiUrl : `${apiUrl}/api`;

const envContent = `# Production API URL
VITE_API_BASE_URL=${normalizedUrl}
REACT_APP_API_BASE_URL=${normalizedUrl}

# Admin email
VITE_ADMIN_EMAIL=77virpalsinh77@gmail.com
REACT_APP_ADMIN_EMAIL=77virpalsinh77@gmail.com
`;

fs.writeFileSync(envPath, envContent);
console.log(`✅ API URL set to: ${apiUrl}`);
console.log(`📝 Updated: ${envPath}`);