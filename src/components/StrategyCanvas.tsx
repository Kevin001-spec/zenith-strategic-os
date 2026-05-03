import React, { useState } from 'react';
import { motion, Reorder } from 'framer-motion';
import { Target, BarChart3, Users, Zap, CheckCircle2 } from 'lucide-react';

const INITIAL_PILLARS = [
  { id: '1', title: 'Market Positioning', icon: <Target size={20} />, status: 'Optimized' },
  { id: '2', title: 'Revenue Operations', icon: <BarChart3 size={20} />, status: 'Scaling' },
  { id: '3', title: 'Talent Acquisition', icon: <Users size={20} />, status: 'Stabilized' },
  { id: '4', title: 'Product Velocity', icon: <Zap size={20} />, status: 'Accelerating' },
];

export const StrategyCanvas = ({ onAudit }: { onAudit: () => void }) => {
  const [pillars, setPillars] = useState(INITIAL_PILLARS);

  return (
    <section id="strategy" className="section-container">
      <div style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '12px' }}>Strategic Canvas</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Architect your organization's core pillars in real-time.</p>
      </div>

      <div className="glass" style={{ borderRadius: '24px', padding: '40px', overflow: 'hidden' }}>
        <Reorder.Group axis="y" values={pillars} onReorder={setPillars} style={{ listStyle: 'none' }}>
          {pillars.map((pillar) => (
            <Reorder.Item key={pillar.id} value={pillar}>
              <motion.div 
                className="glass"
                whileHover={{ scale: 1.01 }}
                style={{ 
                  marginBottom: '16px', 
                  padding: '20px', 
                  borderRadius: '12px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  cursor: 'grab'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ color: 'var(--accent-primary)' }}>{pillar.icon}</div>
                  <div>
                    <div style={{ fontWeight: 600 }}>{pillar.title}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Core Component</div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--accent-secondary)' }}>{pillar.status}</span>
                  <CheckCircle2 size={18} color="#10B981" />
                </div>
              </motion.div>
            </Reorder.Item>
          ))}
        </Reorder.Group>
        
        <div style={{ marginTop: '40px', textAlign: 'center', borderTop: '1px solid var(--glass-border)', paddingTop: '40px' }}>
          <p style={{ marginBottom: '24px', color: 'var(--text-secondary)' }}>
            Ready to deploy this architecture? Get a professional audit.
          </p>
          <button className="premium-button" onClick={onAudit}>
            Request Strategy Audit
          </button>
        </div>
      </div>
    </section>
  );
};
