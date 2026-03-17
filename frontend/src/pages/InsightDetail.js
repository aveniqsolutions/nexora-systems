import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Calendar } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const InsightDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`${API}/blog/${slug}`);
      setPost(response.data);
    } catch (error) {
      console.error('Failed to fetch blog post:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center" data-testid="loading-state">
        <p className="text-muted">Loading...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center" data-testid="not-found-state">
        <div className="text-center">
          <p className="text-muted mb-4">Post not found</p>
          <button onClick={() => navigate('/insights')} className="text-primary hover:underline">
            Back to Insights
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="py-24 md:py-32 border-b border-border" data-testid="insight-header">
        <div className="w-full max-w-[900px] mx-auto px-6 md:px-12">
          <button
            onClick={() => navigate('/insights')}
            className="flex items-center text-sm text-muted hover:text-foreground mb-8 transition-colors"
            data-testid="back-button"
          >
            <ArrowLeft className="mr-2" size={16} />
            Back to Insights
          </button>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary mb-6" data-testid="insight-category">
            {post.category}
          </p>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-none mb-6" data-testid="insight-title">
            {post.title}
          </h1>
          <div className="flex items-center gap-6 text-muted">
            <span data-testid="insight-author">By {post.author}</span>
            <span className="flex items-center" data-testid="insight-date">
              <Calendar size={16} className="mr-2" />
              {formatDate(post.created_at)}
            </span>
          </div>
        </div>
      </section>

      {/* Image */}
      {post.image_url && (
        <section className="border-b border-border" data-testid="insight-image">
          <img src={post.image_url} alt={post.title} className="w-full h-[400px] md:h-[600px] object-cover" loading="lazy" />
        </section>
      )}

      {/* Content */}
      <section className="py-16" data-testid="insight-content">
        <div className="w-full max-w-[900px] mx-auto px-6 md:px-12">
          <div className="prose prose-lg max-w-none">
            <div className="text-muted leading-relaxed whitespace-pre-wrap" data-testid="insight-body">
              {post.content}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 border-t border-border" data-testid="insight-cta">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <h2 className="text-4xl md:text-5xl font-semibold mb-6">Let's Talk About Your Project</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            Ready to explore how we can help transform your business?
          </p>
          <a
            href="/contact"
            className="inline-flex h-12 px-8 bg-primary text-primary-foreground font-medium rounded-sm hover:bg-primary/90 transition-all duration-300 active:scale-95 items-center"
            data-testid="cta-contact-btn"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
};

export default InsightDetail;