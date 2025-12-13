import { useState, useEffect } from 'react';
import { Mail, Trash2, Eye, EyeOff, LogOut, User, Calendar, MessageSquare } from 'lucide-react';
import ApiService from '../services/api';
import './AdminDashboard.css';

const AdminDashboard = ({ admin, onLogout }) => {
  const [messages, setMessages] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    fetchMessages();
    fetchStats();
  }, [currentPage]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await ApiService.getMessagesProtected(currentPage, 10);
      setMessages(response.data);
      setPagination(response.pagination);
    } catch (error) {
      setError('Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await ApiService.getMessageStatsProtected();
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch stats');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) {
      return;
    }

    try {
      await ApiService.deleteMessageProtected(id);
      setMessages(messages.filter(msg => msg._id !== id));
      fetchStats(); // Refresh stats
    } catch (error) {
      setError('Failed to delete message');
    }
  };

  const handleToggleRead = async (id) => {
    try {
      await ApiService.toggleReadStatusProtected(id);
      setMessages(messages.map(msg => 
        msg._id === id ? { ...msg, isRead: !msg.isRead } : msg
      ));
      fetchStats(); // Refresh stats
    } catch (error) {
      setError('Failed to update message status');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    onLogout();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="admin-header-content">
          <div className="admin-info">
            <h1>Admin Dashboard</h1>
            <p>Welcome back, {admin.name}</p>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </header>

      <main className="admin-main">
        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <MessageSquare size={24} />
            </div>
            <div className="stat-info">
              <h3>{stats.total || 0}</h3>
              <p>Total Messages</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon unread">
              <Mail size={24} />
            </div>
            <div className="stat-info">
              <h3>{stats.unread || 0}</h3>
              <p>Unread Messages</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon read">
              <Eye size={24} />
            </div>
            <div className="stat-info">
              <h3>{stats.read || 0}</h3>
              <p>Read Messages</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon recent">
              <Calendar size={24} />
            </div>
            <div className="stat-info">
              <h3>{stats.recentWeek || 0}</h3>
              <p>This Week</p>
            </div>
          </div>
        </div>

        {/* Messages Section */}
        <div className="messages-section">
          <h2>Contact Messages</h2>
          
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {loading ? (
            <div className="loading">Loading messages...</div>
          ) : messages.length === 0 ? (
            <div className="no-messages">No messages found</div>
          ) : (
            <>
              <div className="messages-list">
                {messages.map((message) => (
                  <div key={message._id} className={`message-card ${message.isRead ? 'read' : 'unread'}`}>
                    <div className="message-header">
                      <div className="message-info">
                        <h3>{message.name}</h3>
                        <p className="message-email">{message.email}</p>
                        <p className="message-date">{formatDate(message.createdAt)}</p>
                      </div>
                      <div className="message-actions">
                        <button
                          onClick={() => handleToggleRead(message._id)}
                          className={`action-btn ${message.isRead ? 'read' : 'unread'}`}
                          title={message.isRead ? 'Mark as unread' : 'Mark as read'}
                        >
                          {message.isRead ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                        <button
                          onClick={() => handleDelete(message._id)}
                          className="action-btn delete"
                          title="Delete message"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                    <div className="message-content">
                      <p>{message.message}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="pagination">
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={!pagination.hasPrev}
                    className="pagination-btn"
                  >
                    Previous
                  </button>
                  <span className="pagination-info">
                    Page {pagination.currentPage} of {pagination.totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={!pagination.hasNext}
                    className="pagination-btn"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;