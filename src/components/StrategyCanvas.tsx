import React, { useState } from 'react';
import { motion, Reorder, AnimatePresence } from 'framer-motion';
import { Target, BarChart3, Users, Zap, CheckCircle2, Plus, GripVertical, Trash2 } from 'lucide-react';

const INITIAL_PILLARS = [
  { id: '1', title: 'Market Positioning', icon: <Target size={20} />, status: 'Optimized' },
  { id: '2', title: 'Revenue Operations', icon: <BarChart3 size={20} />, status: 'Scaling' },
  { id: '3', title: 'Talent Acquisition', icon: <Users size={20} />, status: 'Stabilized' },
  { id: '4', title: 'Product Velocity', icon: <Zap size={20} />, status: 'Accelerating' },
];

export const StrategyCanvas = ({ onAudit }: { onAudit: () => void }) => {
  const [pillars, setPillars] = useState(INITIAL_PILLARS);

  const addPillar = () => {
    const newPillar = {
      id: Date.now().toString(),
      title: 'New Strategic Pillar',
      icon: <Zap size={20} />,
      status: 'Initial'
    };
    setPillars([...pillars, newPillar]);
  };

  const removePillar = (id: string) => {
    setPillars(pillars.filter(p => p.id !== id));
  };

  return (
    <section id="strategy" className="section-container">
      <div style={{ marginBottom: '64px' }}>
        <span className="badge">Interactive Intelligence</span>
        <h2 style={{ fontSize: '3rem', marginBottom: '16px', letterSpacing: '-0.04em' }}>Strategic Canvas</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px' }}>
          Architect your organization's core pillars. Drag to reorder, add to expand, and audit to deploy.
        </p>
      </div>

      <div className="glass" style={{ borderRadius: '32px', padding: '48px', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>
            System Architecture
          </div>
          <button 
            onClick={addPillar}
            className="glass" 
            style={{ padding: '8px 16px', borderRadius: '100px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-primary)', fontSize: '0.85rem', fontWeight: 600 }}
          >
            <Plus size={16} /> Add Pillar
          </button>
        </div>

        <Reorder.Group axis="y" values={pillars} onReorder={setPillars} style={{ listStyle: 'none' }}>
          <AnimatePresence>
            {pillars.map((pillar) => (
              <Reorder.Item 
                key={pillar.id} 
                value={pillar}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <motion.div 
                  className="glass"
                  whileHover={{ scale: 1.01, borderColor: 'rgba(255,255,255,0.2)' }}
                  style={{ 
                    marginBottom: '16px', 
                    padding: '24px', 
                    borderRadius: '16px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    cursor: 'grab',
                    background: 'rgba(255,255,255,0.02)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ color: 'var(--text-secondary)', cursor: 'grab' }}>
                      <GripVertical size={20} />
                    </div>
                    <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '12px', borderRadius: '12px', color: 'var(--accent-primary)' }}>
                      {pillar.icon}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>{pillar.title}</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>System Component</div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <span style={{ 
                      fontSize: '0.8rem', 
                      color: 'var(--accent-secondary)', 
                      background: 'rgba(96, 165, 250, 0.1)', 
                      padding: '4px 12px', 
                      borderRadius: '100px',
                      fontWeight: 600
                    }}>
                      {pillar.status}
                    </span>
                    <button 
                      onClick={(e) => { e.stopPropagation(); removePillar(pillar.id); }}
                      style={{ background: 'none', border: 'none', color: 'rgba(239, 68, 68, 0.4)', cursor: 'pointer', transition: 'color 0.2s' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#EF4444'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(239, 68, 68, 0.4)'}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </motion.div>
              </Reorder.Item>
            ))}
          </AnimatePresence>
        </Reorder.Group>
        
        <div style={{ marginTop: '48px', textAlign: 'center', borderTop: '1px solid var(--glass-border)', paddingTop: '48px' }}>
          <p style={{ marginBottom: '28px', color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
            Ready to deploy this organizational architecture? 
          </p>
          <button className="premium-button" onClick={onAudit} style={{ padding: '16px 40px', fontSize: '1rem' }}>
            Deploy Strategic Audit
          </button>
        </div>
      </div>
    </section>
  );
};
