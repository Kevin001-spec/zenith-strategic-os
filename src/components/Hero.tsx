import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export const Hero = ({ onStart }: { onStart: () => void }) => {
  return (
    <section className="section-container" style={{ textAlign: 'center', paddingTop: '160px' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="badge">
          <Sparkles size={14} style={{ marginRight: '6px' }} />
          Strategic Intelligence v4.0
        </span>
        
        <h1 style={{ 
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
          lineHeight: 1.1, 
          marginBottom: '24px',
          background: 'linear-gradient(to bottom, #fff 0%, #a1a1aa 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          The Operating System for <br /> Fractional Leadership.
        </h1>
        
        <p style={{ 
          color: 'var(--text-secondary)', 
          fontSize: '1.25rem', 
          maxWidth: '600px', 
          margin: '0 auto 40px',
          lineHeight: 1.6
        }}>
          Zenith centralizes your strategic logic, client acquisition, and operational rhythms into one premium workspace.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <button className="premium-button" style={{ padding: '16px 32px' }} onClick={onStart}>
            Initialize OS <ArrowRight size={20} />
          </button>
          <button className="glass" style={{ 
            padding: '16px 32px', 
            borderRadius: '8px', 
            color: 'white', 
            fontWeight: 600,
            cursor: 'pointer'
          }}>
            Watch Briefing
          </button>
        </div>
      </motion.div>
    </section>
  );
};
