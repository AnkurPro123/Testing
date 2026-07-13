import React, { useState, useEffect } from 'react';
import './test.css'; // Importing the charcoal stylesheet below

export default function Test() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(true);

  // Fetch data from the Express backend on load
  useEffect(() => {
    fetch('http://localhost:5000/api/items')
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => console.error('Error fetching data:', err));
  }, []);

  // Handle form submission to add dynamic content
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newItem.title || !newItem.description) return;

    try {
      const response = await fetch('http://localhost:5000/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      });
      const data = await response.json();
      setItems([data, ...items]); // Update state dynamically
      setNewItem({ title: '', description: '' }); // Reset form
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <div className="app-container">
      {/* Navigation */}
      <nav className="navbar">
        <h1 className="nav-logo">CHARCOAL.</h1>
        <div className="nav-links">
          <a href="#feed">Feed</a>
          <a href="#create">Create</a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        
        {/* Header Section */}
        <header className="hero-header">
          <h2>Dynamic Content Dashboard</h2>
          <p>
            A minimalist workspace integrated with a live database. Add entries below to see the content update in real-time.
          </p>
        </header>

        {/* Form Section */}
        <section id="create" className="form-card">
          <h3>Add New Entry</h3>
          <form onSubmit={handleSubmit} className="entry-form">
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={newItem.title}
                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                placeholder="Project title or heading..."
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                placeholder="Write something profound..."
              />
            </div>
            <button type="submit" className="submit-btn">
              Publish Entry
            </button>
          </form>
        </section>

        {/* Dynamic Feed Section */}
        <section id="feed" className="feed-section">
          <div className="feed-header">
            <h3>Live Stream</h3>
            <span className="badge">{items.length} Entries</span>
          </div>

          {loading ? (
            <p className="status-msg">Syncing with database...</p>
          ) : items.length === 0 ? (
            <p className="status-msg">No entries found. Drop one above!</p>
          ) : (
            <div className="feed-grid">
              {items.map((item) => (
                <div key={item._id} className="feed-card">
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                  <span className="card-date">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}