import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowRight, Calendar } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Insights = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${API}/blog`);
      setPosts(response.data);
    } catch (error) {
      console.error('Failed to fetch blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="py-24 md:py-32 border-b border-border" data-testid="insights-header">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary mb-6" data-testid="insights-overline">
            Insights & Perspectives
          </p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-none mb-6" data-testid="insights-title">
            Latest Thinking
          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl" data-testid="insights-description">
            Explore our latest research, insights, and thought leadership on AI, digital transformation, and enterprise technology.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16" data-testid="insights-list">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
          {loading ? (
            <div className="text-center py-20" data-testid="loading-state">
              <p className="text-muted">Loading insights...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20" data-testid="empty-state">
              <p className="text-muted">No insights available yet. Check back soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-0 border-l border-t border-border">
              {posts.map((post, index) => (
                <Link
                  key={post.id}
                  to={`/insights/${post.slug}`}
                  className="md:col-span-6 p-12 border-r border-b border-border hover:bg-secondary/30 transition-colors duration-300 group"
                  data-testid={`insight-item-${index}`}
                >
                  {post.image_url && (
                    <div className="mb-6 overflow-hidden">
                      <img
                        src={post.image_url}
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <p className="text-xs uppercase tracking-[0.2em] text-primary mb-3" data-testid={`insight-category-${index}`}>
                    {post.category}
                  </p>
                  <h3 className="text-2xl font-medium mb-3 group-hover:text-primary transition-colors" data-testid={`insight-title-${index}`}>
                    {post.title}
                  </h3>
                  <p className="text-muted leading-relaxed mb-4" data-testid={`insight-excerpt-${index}`}>
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-muted">
                    <span className="flex items-center" data-testid={`insight-author-${index}`}>
                      <span className="mr-1">By</span> {post.author}
                    </span>
                    <span className="flex items-center" data-testid={`insight-date-${index}`}>
                      <Calendar size={14} className="mr-1" />
                      {formatDate(post.created_at)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Insights;