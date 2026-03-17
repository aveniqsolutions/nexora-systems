import React, { useEffect } from 'react';
import { Cpu, Database, Cloud, Zap, Shield, TrendingUp } from 'lucide-react';

const Services = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      icon: <Cpu size={32} />,
      title: 'AI Strategy & Implementation',
      description: 'Comprehensive AI transformation from vision to execution. We design, develop, and deploy intelligent systems tailored to your business objectives.',
      capabilities: [
        'AI Roadmap Development',
        'Machine Learning Model Development',
        'Natural Language Processing',
        'Computer Vision Solutions',
        'AI Integration & Deployment'
      ]
    },
    {
      icon: <Database size={32} />,
      title: 'Data Engineering & Analytics',
      description: 'Build robust data foundations that power intelligent decision-making. From ingestion to visualization, we architect end-to-end data solutions.',
      capabilities: [
        'Data Pipeline Architecture',
        'Data Warehouse Design',
        'Real-time Analytics',
        'Business Intelligence',
        'Data Governance'
      ]
    },
    {
      icon: <Cloud size={32} />,
      title: 'Cloud & Infrastructure',
      description: 'Modernize your infrastructure with cloud-native architectures. Scalable, secure, and optimized for performance and cost efficiency.',
      capabilities: [
        'Cloud Migration Strategy',
        'Multi-Cloud Architecture',
        'Infrastructure as Code',
        'DevOps & CI/CD',
        'Cloud Security'
      ]
    },
    {
      icon: <Zap size={32} />,
      title: 'Process Automation',
      description: 'Automate repetitive tasks and optimize workflows. Increase efficiency, reduce errors, and free your team to focus on strategic initiatives.',
      capabilities: [
        'Robotic Process Automation',
        'Workflow Optimization',
        'Integration Solutions',
        'Intelligent Document Processing',
        'Custom Automation Tools'
      ]
    },
    {
      icon: <Shield size={32} />,
      title: 'Cybersecurity & Compliance',
      description: 'Protect your digital assets with enterprise-grade security. Comprehensive security assessments, implementation, and ongoing monitoring.',
      capabilities: [
        'Security Audits',
        'Compliance Management',
        'Zero Trust Architecture',
        'Threat Detection',
        'Incident Response'
      ]
    },
    {
      icon: <TrendingUp size={32} />,
      title: 'Digital Transformation',
      description: 'Holistic transformation programs that reimagine how you operate. From strategy to execution, we guide your end-to-end transformation journey.',
      capabilities: [
        'Transformation Strategy',
        'Change Management',
        'Digital Operating Model',
        'Innovation Workshops',
        'Value Realization'
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="py-24 md:py-32 border-b border-border" data-testid="services-header">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary mb-6" data-testid="services-overline">
            Our Services
          </p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-none mb-6" data-testid="services-title">
            Enterprise Solutions
          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl" data-testid="services-description">
            We deliver end-to-end solutions that drive measurable business outcomes. Our expertise spans AI, data, cloud, and digital transformation.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16" data-testid="services-list">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0 border-l border-t border-border">
            {services.map((service, index) => (
              <div
                key={index}
                className="md:col-span-6 p-12 border-r border-b border-border hover:bg-secondary/30 transition-colors duration-300"
                data-testid={`service-item-${index}`}
              >
                <div className="mb-6 p-3 bg-primary/10 w-fit rounded-sm text-primary">
                  {service.icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-medium mb-4" data-testid={`service-title-${index}`}>
                  {service.title}
                </h3>
                <p className="text-muted leading-relaxed mb-6" data-testid={`service-description-${index}`}>
                  {service.description}
                </p>
                <div className="space-y-2">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] mb-3">Capabilities</p>
                  <ul className="space-y-2">
                    {service.capabilities.map((capability, capIndex) => (
                      <li key={capIndex} className="text-sm text-muted flex items-start" data-testid={`service-capability-${index}-${capIndex}`}>
                        <span className="text-primary mr-2">—</span>
                        {capability}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 border-t border-border" data-testid="services-cta">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <h2 className="text-4xl md:text-5xl font-semibold mb-6" data-testid="services-cta-title">
            Let's Build Something Extraordinary
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-12" data-testid="services-cta-description">
            Discuss your project with our team of experts.
          </p>
          <a
            href="/contact"
            className="inline-flex h-12 px-8 bg-primary text-primary-foreground font-medium rounded-sm hover:bg-primary/90 transition-all duration-300 active:scale-95 items-center"
            data-testid="services-contact-btn"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
};

export default Services;