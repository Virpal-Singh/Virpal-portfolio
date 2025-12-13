import { API_CONFIG } from '../config/api.js';

class ApiService {
  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    console.log('API Base URL:', this.baseURL); // Debug log
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    console.log('Making API request to:', url); // Debug log

    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      signal: AbortSignal.timeout(API_CONFIG.TIMEOUT),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      // Check if response is ok before trying to parse JSON
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("API Request Error:", error);
      console.error("Request URL:", url);
      console.error("Request Config:", config);
      throw error;
    }
  }

  // Contact form methods
  async sendMessage(messageData) {
    return this.request("/messages", {
      method: "POST",
      body: JSON.stringify(messageData),
    });
  }

  async getMessages(page = 1, limit = 10) {
    return this.request(`/messages?page=${page}&limit=${limit}`);
  }

  async getMessage(id) {
    return this.request(`/messages/${id}`);
  }

  async deleteMessage(id) {
    return this.request(`/messages/${id}`, {
      method: "DELETE",
    });
  }

  async toggleReadStatus(id) {
    return this.request(`/messages/${id}/read`, {
      method: "PATCH",
    });
  }

  async getMessageStats() {
    return this.request("/messages/stats");
  }

  // Health check
  async healthCheck() {
    return this.request("/health");
  }

  // Auth methods
  async login(credentials) {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  }

  async getProfile() {
    const token = localStorage.getItem("adminToken");
    return this.request("/auth/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async logout() {
    const token = localStorage.getItem("adminToken");
    return this.request("/auth/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Protected message methods
  async getMessagesProtected(page = 1, limit = 10) {
    const token = localStorage.getItem("adminToken");
    return this.request(`/messages?page=${page}&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async deleteMessageProtected(id) {
    const token = localStorage.getItem("adminToken");
    return this.request(`/messages/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async toggleReadStatusProtected(id) {
    const token = localStorage.getItem("adminToken");
    return this.request(`/messages/${id}/read`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getMessageStatsProtected() {
    const token = localStorage.getItem("adminToken");
    return this.request("/messages/stats", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  // Chat methods
  async sendChatMessage(message, sessionId) {
    return this.request('/chat', {
      method: 'POST',
      body: JSON.stringify({ message, sessionId }),
    });
  }

  async getChatHistory(sessionId, page = 1, limit = 20) {
    return this.request(`/chat/${sessionId}?page=${page}&limit=${limit}`);
  }

  async getChatStatsProtected() {
    const token = localStorage.getItem('adminToken');
    return this.request('/chat/admin/stats', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new ApiService();