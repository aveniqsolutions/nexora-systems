import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background" data-testid="footer">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-border">
          {/* Brand */}
          <div className="md:col-span-4">
            <h3 className="text-2xl font-bold mb-4" data-testid="footer-brand">NEXORA</h3>
            <p className="text-muted text-sm leading-relaxed mb-6">
              AI and digital transformation consulting for forward-thinking enterprises.
            </p>
            <div className="flex gap-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-secondary rounded-sm transition-colors" data-testid="footer-linkedin" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-secondary rounded-sm transition-colors" data-testid="footer-twitter" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-secondary rounded-sm transition-colors" data-testid="footer-github" aria-label="GitHub">
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="md:col-span-2">
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] mb-4" data-testid="footer-services-title">Services</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/services" className="text-muted hover:text-foreground transition-colors" data-testid="footer-link-ai-strategy">AI Strategy</Link></li>
              <li><Link to="/services" className="text-muted hover:text-foreground transition-colors" data-testid="footer-link-data-engineering">Data Engineering</Link></li>
              <li><Link to="/services" className="text-muted hover:text-foreground transition-colors" data-testid="footer-link-automation">Automation</Link></li>
              <li><Link to="/services" className="text-muted hover:text-foreground transition-colors" data-testid="footer-link-cloud">Cloud Migration</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="md:col-span-2">
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] mb-4" data-testid="footer-company-title">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="text-muted hover:text-foreground transition-colors" data-testid="footer-link-about">About</Link></li>
              <li><Link to="/careers" className="text-muted hover:text-foreground transition-colors" data-testid="footer-link-careers">Careers</Link></li>
              <li><Link to="/case-studies" className="text-muted hover:text-foreground transition-colors" data-testid="footer-link-case-studies">Case Studies</Link></li>
              <li><Link to="/insights" className="text-muted hover:text-foreground transition-colors" data-testid="footer-link-insights">Insights</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="md:col-span-2">
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] mb-4" data-testid="footer-resources-title">Resources</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/contact" className="text-muted hover:text-foreground transition-colors" data-testid="footer-link-contact">Contact</Link></li>
              <li><Link to="/demo" className="text-muted hover:text-foreground transition-colors" data-testid="footer-link-demo">Request Demo</Link></li>
              <li><Link to="/privacy" className="text-muted hover:text-foreground transition-colors" data-testid="footer-link-privacy">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-2">
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] mb-4" data-testid="footer-contact-title">Contact</h4>
            <ul className="space-y-3 text-sm text-muted">
              <li data-testid="footer-email">hello@nexora.systems</li>
              <li data-testid="footer-phone">+1 (555) 123-4567</li>
              <li data-testid="footer-address">San Francisco, CA</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 text-center md:text-left">
          <p className="text-sm text-muted" data-testid="footer-copyright">
            © {new Date().getFullYear()} Nexora Systems. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;