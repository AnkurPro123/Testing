import React, { useState, useEffect } from 'react';
import './test.css'; // Utilizing your existing charcoal layout styles

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [stats, setStats] = useState({ totalEntries: 0, latestUpdate: 'Never', healthStatus: 'Syncing' });
  const [loading, setLoading] = useState(true);

  // 1. Fetch live data straight from your Express Supabase endpoint
  const fetchDashboardData = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/items');
      if (!res.ok) throw new Error('Backend failed to respond');
      
      const data = await res.json();
      setItems(data);
      
      // Calculate dynamic stats from the database response
      setStats({
        totalEntries: data.length,
        latestUpdate: data.length > 0 ? new Date(data[0].createdAt).toLocaleTimeString() : 'No entries',
        healthStatus: 'Connected'
      });
    } catch (err) {
      console.error('Error syncing dashboard telemetry:', err);
      setStats((prev) => ({ ...prev, healthStatus: 'Disconnect' }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // 2. Refresh wrapper to allow manual polling updates
  const handleManualRefresh = () => {
    setLoading(true);
    fetchDashboardData();
  };

  return (
    <div className="app-container">
      {/* Navigation */}
      <nav className="navbar">
        <h1 className="nav-logo">CHARCOAL.</h1>
        <div className="nav-links">
          <a href="#metrics" className="active">Overview</a>
          <a href="#logs">Telemetry Logs</a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        
        {/* Header Section */}
        <header className="hero-header">
          <h2>Supabase Telemetry Dashboard</h2>
          <p>
            Real-time metric parsing driven by your integrated Express engine layers.
          </p>
        </header>

        {/* Dynamic Metrics Section */}
        <section id="metrics" className="feed-section">
          <div className="feed-header">
            <h3>System Architecture KPIs</h3>
            <span className={`badge ${loading ? 'loading' : ''}`}>
              {loading ? 'Polling...' : 'Active Stream'}
            </span>
          </div>

          <div className="feed-grid">
            <div className="feed-card">
              <span className="card-date">DATABASE DENSITY</span>
              <h4 style={{ fontSize: '1.5rem', marginTop: '0.5rem' }}>{stats.totalEntries} Rows Total</h4>
            </div>

            <div className="feed-card">
              <span className="card-date">LATEST INSTANCE DELTA</span>
              <h4 style={{ fontSize: '1.5rem', marginTop: '0.5rem' }}>{stats.latestUpdate}</h4>
            </div>

            <div className="feed-card">
              <span className="card-date">GATEWAY HEALTH</span>
              <h4 
                style={{ 
                  fontSize: '1.5rem', 
                  marginTop: '0.5rem', 
                  color: stats.healthStatus === 'Connected' ? '#a3be8c' : '#bf616a' 
                }}
              >
                {stats.healthStatus}
              </h4>
            </div>
          </div>
        </section>

        {/* Operational Split Layout */}
        <div className="dashboard-layout-split" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', marginTop: '2rem' }}>
          
          {/* Action Control Panel */}
          <section className="form-card" style={{ margin: 0, height: 'fit-content' }}>
            <h3>Engine Controls</h3>
            <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: '1.5rem', lineHeight: '1.4' }}>
              Interact directly with the operational state parameters of your Supabase layer instance.
            </p>
            <div className="entry-form">
              <button onClick={handleManualRefresh} className="submit-btn" disabled={loading} style={{ width: '100%' }}>
                {loading ? 'Re-polling System...' : 'Force Telemetry Refresh'}
              </button>
              <button 
                className="submit-btn" 
                onClick={() => window.location.hash = 'create'} // Quick jump to the form entry component
                style={{ width: '100%', marginTop: '0.75rem', background: 'transparent', border: '1px solid #333', color: '#eee' }}
              >
                Inject Document Entry
              </button>
            </div>
          </section>

          {/* Activity / Event Audit Stream */}
          <section id="logs" className="feed-section" style={{ marginTop: 0 }}>
            <div className="feed-header">
              <h3>Action Logs (Newest First)</h3>
            </div>

            {loading && items.length === 0 ? (
              <p className="status-msg">Extracting data buffers from host...</p>
            ) : items.length === 0 ? (
              <p className="status-msg">Telemetry stream empty. Add structural item models to populate.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {items.slice(0, 5).map((item) => (
                  <div key={item._id} className="feed-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem' }}>
                    <div style={{ flexGrow: 1 }}>
                      <span className="card-date" style={{ display: 'block', marginBottom: '0.25rem' }}>INSERT CAPTURED</span>
                      <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: '500' }}>{item.title}</h4>
                    </div>
                    <span className="badge" style={{ backgroundColor: '#2e3440', border: '1px solid #434c5e', fontSize: '0.75rem' }}>
                      {new Date(item.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

      </main>
    </div>
  );
}