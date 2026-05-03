import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const LeadForm = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [challenge, setChallenge] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const { error } = await supabase
      .from('zenith_leads')
      .insert([{ email, company, challenge, status: 'pending' }]);

    setIsSubmitting(false);
    if (error) {
      alert('Strategic deployment failed: ' + error.message);
    } else {
      setIsSuccess(true);
      setEmail('');
      setCompany('');
      setChallenge('');
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 4000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
            padding: '24px'
          }}
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="glass"
            style={{
              width: '100%',
              maxWidth: '500px',
              padding: '40px',
              borderRadius: '24px',
              position: 'relative'
            }}
          >
            <button 
              onClick={onClose}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
            >
              <X size={24} />
            </button>

            {isSuccess ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <CheckCircle size={64} color="#10B981" style={{ marginBottom: '24px' }} />
                <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>Request Received</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Our strategy team will review your profile and reach out within 24 hours.</p>
              </div>
            ) : (
              <>
                <h3 style={{ fontSize: '1.75rem', marginBottom: '8px' }}>Request Strategy Audit</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Deploy your organizational logic to our intelligence engine.</p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Work Email</label>
                    <input 
                      required
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Organization</label>
                    <input 
                      type="text" 
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Primary Strategic Challenge</label>
                    <textarea 
                      value={challenge}
                      onChange={(e) => setChallenge(e.target.value)}
                      style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white', minHeight: '100px' }}
                    />
                  </div>
                  <button 
                    disabled={isSubmitting}
                    className="premium-button" 
                    style={{ width: '100%', justifyContent: 'center', marginTop: '12px' }}
                  >
                    {isSubmitting ? 'Processing...' : 'Submit Architecture'} <Send size={18} />
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
