// Fallback for environment variables
const getEnvVar = (name, fallback) => {
  try {
    return process.env[name] || fallback;
  } catch (error) {
    return fallback;
  }
};

const API_BASE_URL = getEnvVar(
  "REACT_APP_API_BASE_URL",
  "http://localhost:5000/api"
);

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;

    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || `HTTP error! status: ${response.status}`
        );
      }

      return data;
    } catch (error) {
      console.error("API Request Error:", error);
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