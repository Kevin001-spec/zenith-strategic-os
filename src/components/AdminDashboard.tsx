import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Table, Trash2, CheckCircle, Clock, RefreshCcw, ExternalLink, Mail, Building2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AdminDashboard = () => {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setRefreshing(true);
    const { data, error } = await supabase
      .from('zenith_leads')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      setError(error.message);
    } else {
      setLeads(data || []);
      setError(null);
    }
    setLoading(false);
    setRefreshing(false);
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from('zenith_leads')
      .update({ status })
      .eq('id', id);
    
    if (!error) fetchLeads();
  };

  const deleteLead = async (id: string) => {
    if (!confirm('Are you sure you want to delete this strategic lead?')) return;
    const { error } = await supabase
      .from('zenith_leads')
      .delete()
      .eq('id', id);
    
    if (!error) fetchLeads();
  };

  if (loading) return (
    <div className="section-container" style={{ textAlign: 'center', paddingTop: '200px' }}>
      <RefreshCcw className="animate-spin" size={48} color="var(--accent-primary)" style={{ animation: 'spin 2s linear infinite' }} />
      <p style={{ marginTop: '24px', color: 'var(--text-secondary)' }}>Synchronizing Strategic Intelligence...</p>
    </div>
  );

  return (
    <div className="section-container" style={{ paddingTop: '140px' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass" 
        style={{ padding: '48px', borderRadius: '32px' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', letterSpacing: '-0.03em' }}>Command Center</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Managing the Zenith Strategic Ecosystem.</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              onClick={fetchLeads} 
              className="glass" 
              style={{ padding: '12px', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <RefreshCcw size={18} className={refreshing ? 'animate-spin' : ''} />
            </button>
            <div className="badge" style={{ margin: 0 }}>Administrator Mode</div>
          </div>
        </div>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '16px', borderRadius: '12px', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px', color: '#EF4444' }}>
            <AlertCircle size={20} />
            {error}
          </div>
        )}

        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr style={{ textAlign: 'left', color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '12px 20px' }}>Source / Intelligence</th>
                <th style={{ padding: '12px 20px' }}>Core Challenge</th>
                <th style={{ padding: '12px 20px' }}>Deployment Status</th>
                <th style={{ padding: '12px 20px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {leads.map((lead) => (
                  <motion.tr 
                    key={lead.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '10px', borderRadius: '10px', color: 'var(--accent-primary)' }}>
                          <Mail size={20} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '1rem' }}>{lead.email}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Building2 size={12} /> {lead.company || 'Private Entity'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', maxWidth: '350px', lineHeight: '1.4' }}>
                        {lead.challenge || 'No challenge data provided.'}
                      </div>
                    </td>
                    <td>
                      <span style={{ 
                        fontSize: '0.7rem', 
                        fontWeight: 700,
                        padding: '6px 12px', 
                        borderRadius: '100px', 
                        background: lead.status === 'resolved' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                        color: lead.status === 'resolved' ? '#10B981' : '#F59E0B',
                        border: `1px solid ${lead.status === 'resolved' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)'}`
                      }}>
                        {lead.status.toUpperCase()}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <button 
                          onClick={() => updateStatus(lead.id, 'resolved')}
                          className="glass" 
                          title="Resolve Lead"
                          style={{ padding: '10px', borderRadius: '10px', cursor: 'pointer', color: '#10B981' }}
                        >
                          <CheckCircle size={18} />
                        </button>
                        <button 
                          onClick={() => deleteLead(lead.id)}
                          className="glass" 
                          title="Delete Permanently"
                          style={{ padding: '10px', borderRadius: '10px', cursor: 'pointer', color: '#EF4444' }}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {leads.length === 0 && !error && (
            <div style={{ textAlign: 'center', padding: '100px 20px', background: 'rgba(255,255,255,0.01)', borderRadius: '24px', border: '1px dashed var(--glass-border)', marginTop: '24px' }}>
              <Globe size={48} style={{ color: 'var(--glass-border)', marginBottom: '16px' }} />
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Zero Strategic Inbound Detected.</p>
              <p style={{ color: 'rgba(161, 161, 170, 0.5)', fontSize: '0.9rem', marginTop: '8px' }}>Your ecosystem is waiting for its first participant.</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
