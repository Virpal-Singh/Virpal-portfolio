# Virpal Portfolio Backend

Simple Express.js backend for handling contact form messages with MongoDB.

## Features

- ✅ Contact form message handling
- ✅ MongoDB integration with Mongoose
- ✅ Rate limiting for security
- ✅ CORS configuration
- ✅ Environment variables
- ✅ Input validation
- ✅ Error handling
- ✅ Message CRUD operations

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment setup:**
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` with your MongoDB connection string.

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Start production server:**
   ```bash
   npm start
   ```

## API Endpoints

### Public Routes

- `POST /api/messages` - Create new message (contact form)

### Private Routes (Add auth later)

- `GET /api/messages` - Get all messages (with pagination)
- `GET /api/messages/stats` - Get message statistics
- `GET /api/messages/:id` - Get single message
- `PATCH /api/messages/:id/read` - Toggle read status
- `DELETE /api/messages/:id` - Delete message

### Health Check

- `GET /health` - Server health check

## Request Examples

### Send Contact Message
```bash
curl -X POST http://localhost:5000/api/messages \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Hello, I would like to work with you!"
  }'
```

### Get All Messages
```bash
curl http://localhost:5000/api/messages?page=1&limit=10
```

### Get Message Stats
```bash
curl http://localhost:5000/api/messages/stats
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/virpal-portfolio` |
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment mode | `development` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:3000` |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window | `900000` (15 min) |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | `100` |

## Database Schema

### Message Model
```javascript
{
  name: String (required, max 100 chars),
  email: String (required, valid email),
  message: String (required, max 1000 chars),
  isRead: Boolean (default: false),
  ipAddress: String,
  userAgent: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Security Features

- Rate limiting (5 messages per 15 minutes per IP)
- Input validation and sanitization
- CORS protection
- Helmet security headers
- MongoDB injection protection

## Development

- Uses `nodemon` for auto-restart
- Detailed error logging
- Environment-based configuration
- Graceful shutdown handling