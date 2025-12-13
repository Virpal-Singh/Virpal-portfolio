# Chatbot API Documentation

## Overview
AI-powered chatbot using Google Gemini API to answer questions about Virpal Singh's portfolio.

## Features
- ✅ Gemini AI integration
- ✅ Chat history storage
- ✅ Session management
- ✅ Rate limiting (10 messages/minute)
- ✅ Admin statistics
- ✅ Fallback responses

## API Endpoints

### Public Routes

#### Send Chat Message
```
POST /api/chat
```

**Request Body:**
```json
{
  "message": "Tell me about Virpal's projects",
  "sessionId": "unique-session-id"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Response generated successfully",
  "data": {
    "id": "message_id",
    "userMessage": "Tell me about Virpal's projects",
    "botResponse": "Virpal has worked on several projects...",
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Get Chat History
```
GET /api/chat/:sessionId?page=1&limit=20
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "userMessage": "Hello",
      "botResponse": "Hi! I'm Virpal's AI assistant...",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 1,
    "totalMessages": 5
  }
}
```

### Admin Routes (Protected)

#### Get Chat Statistics
```
GET /api/chat/admin/stats
Authorization: Bearer <admin_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalMessages": 150,
    "uniqueSessions": 45,
    "recentWeek": 23,
    "averageMessagesPerSession": 3
  }
}
```

## Environment Variables

Add to your `.env` file:
```
GEMINI_API_KEY=your_gemini_api_key_here
```

## Rate Limiting
- **10 messages per minute** per IP address
- Automatically resets every minute
- Bypassed in development for localhost

## Database Schema

### ChatMessage Model
```javascript
{
  sessionId: String (required, indexed),
  userMessage: String (required, max 1000 chars),
  botResponse: String (required),
  ipAddress: String,
  userAgent: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Usage Examples

### Frontend Integration
```javascript
// Generate unique session ID
const sessionId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

// Send message
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: "What technologies does Virpal use?",
    sessionId: sessionId
  })
});

const data = await response.json();
console.log(data.data.botResponse);
```

## AI Behavior
The chatbot is programmed to:
- Answer questions about Virpal Singh's portfolio
- Provide contact information when requested
- Redirect off-topic questions back to portfolio topics
- Maintain a professional and friendly tone
- Use only the provided information about Virpal

## Error Handling
- Invalid requests return 400 status
- AI service failures return fallback responses
- Rate limit exceeded returns 429 status
- Server errors return 500 with fallback message