"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { mockSubmissions } from './mockdata.jsx';
import Copy from './animations/copy.jsx';
import ImageReveal from './animations/imageReveal.jsx';
import FadeInW from './animations/fadeinw.jsx';
import { ReactLenis } from "lenis/react";
import { Link } from 'react-router-dom';

function AllCommentsPage() {
  const [selectedType, setSelectedType] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [searchTerm, setSearchTerm] = useState('');

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const problemTypes = ['All', ...new Set(mockSubmissions.map(sub => sub.problemType))];

  const filteredSubmissions = useMemo(() => {
    let filtered = mockSubmissions;

    if (selectedType !== 'All') {
      filtered = filtered.filter(sub => sub.problemType === selectedType);
    }

    if (searchTerm) {
      filtered = filtered.filter(sub => 
        sub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date) - new Date(a.date);
        case 'oldest':
          return new Date(a.date) - new Date(b.date);
        case 'urgency':
          const urgencyOrder = { 'Critical': 3, 'High': 2, 'Medium': 1, 'Low': 0 };
          return urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
        default:
          return 0;
      }
    });

    return filtered;
  }, [selectedType, sortBy, searchTerm]);

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'Critical': return '#2f00ffff';
      case 'High': return '#2f00ffff';
      case 'Medium': return '#4752f3ff';
      case 'Low': return '#6694f7ff';
      default: return '#b9d2f8ff';
    }
  };

  return (
    <ReactLenis root>
      <main className="all-comments-page">
        <section className="comments-hero">
          <Copy>
            <h1 className="comments-main-title">ALL THE REPORTS</h1>
            <h1 className="comments-main-title">ALL THE !!SSUES THAT NEED TO MEET THE EYE 👁</h1>
          </Copy>
          <Copy delay={0.1}>
            <p className="comments-subtitle">Every voice matters. Track, filter, and follow up on all reported issues.</p>
          </Copy>
        </section>

        <div className="back-navigation">
          <Link to="/" className="back-button">
            <span className="back-arrow">←</span>
            Back to Home
          </Link>
        </div>

        <section className="filters-section">
          <div className="filters-container">
            <div className="search-box">
              <div className="search-icon">🔍</div>
              <input
                type="text"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              {searchTerm && (
                <button 
                  className="clear-search"
                  onClick={() => setSearchTerm('')}
                >
                  ✕
                </button>
              )}
            </div>

            <div className="filter-controls">
              <div className="filter-group">
                <label className="filter-label">Filter by Type</label>
                <select 
                  value={selectedType} 
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="filter-select"
                >
                  {problemTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label className="filter-label">Sort by</label>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="filter-select"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="urgency">Urgency Level</option>
                </select>
              </div>
            </div>

            <div className="results-info">
              <span className="results-count">
                {filteredSubmissions.length} {filteredSubmissions.length === 1 ? 'report' : 'reports'} found
              </span>
              {selectedType !== 'All' && (
                <span className="active-filter">
                  Filtered by: {selectedType}
                  <button 
                    onClick={() => setSelectedType('All')}
                    className="clear-filter"
                  >
                    ✕
                  </button>
                </span>
              )}
            </div>
          </div>
        </section>

        <section className="all-comments-grid">
          {filteredSubmissions.length > 0 ? (
            <div className="comments-grid">
              {filteredSubmissions.map((comment, index) => (
                <article 
                  key={comment.id} 
                  className="comment-card-expanded"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="card-image-section">
                    <ImageReveal 
                      src={comment.problemImage} 
                      alt={comment.title}
                      className="card-main-image"
                      animateOnScroll={true}
                      delay={0}
                      duration={0.5}
                    />
                    <div className="image-overlay">
                      <span 
                        className="urgency-badge"
                        style={{ backgroundColor: getUrgencyColor(comment.urgency) }}
                      >
                        {comment.urgency}
                      </span>
                    </div>
                  </div>

                  <div className="card-content">
                    <Copy>
                      <h3 className="card-title-expanded">{comment.title}</h3>
                    </Copy>
                    
                    <Copy delay={0.1}>
                      <p className="card-description-expanded">{comment.description}</p>
                    </Copy>

                    <div className="card-meta">
                      <Copy delay={0.2}>
                        <div className="meta-item">
                          <span className="meta-label">Location:</span>
                          <span className="meta-value">{comment.location}</span>
                        </div>
                      </Copy>

                      <Copy delay={0.3}>
                        <div className="meta-item">
                          <span className="meta-label">Type:</span>
                          <span className="meta-value type-tag">{comment.problemType}</span>
                        </div>
                      </Copy>

                      <Copy delay={0.4}>
                        <div className="meta-item">
                          <span className="meta-label">Reported:</span>
                          <span className="meta-value">
                            {new Date(comment.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                      </Copy>
                    </div>

                    <div className="user-info-section">
                      <ImageReveal 
                        src={comment.user.profilePicture} 
                        alt={`Photo of ${comment.user.name}`}
                        className="user-avatar-expanded"
                        animateOnScroll={true}
                        delay={0}
                        duration={0.5}
                      />
                      <div className="user-details">
                        <Copy delay={0.5}>
                          <span className="user-name">
                            {comment.user.isAnonymous ? 'Anonymous' : comment.user.name}
                          </span>
                        </Copy>
                        <Copy delay={0.6}>
                          <span className="report-date">
                            {new Date(comment.date).toLocaleDateString('en-US', { 
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </Copy>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <Copy>
                <h3 className="empty-title">No reports found</h3>
              </Copy>
              <FadeInW>
                <p className="empty-message">
                  {searchTerm || selectedType !== 'All' 
                    ? 'Try adjusting your filters or search terms to see more results.'
                    : 'No reports have been submitted yet. Be the first to report an issue!'
                  }
                </p>
              </FadeInW>
              {(searchTerm || selectedType !== 'All') && (
                <button 
                  className="reset-filters-btn"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedType('All');
                  }}
                >
                  Reset All Filters
                </button>
              )}
            </div>
          )}
        </section>

        <div className="back-to-top">
          <button 
            className="back-to-top-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            ↑ Back to Top
          </button>
        </div>
      </main>
    </ReactLenis>
  );
}

export default AllCommentsPage;