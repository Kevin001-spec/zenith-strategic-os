import React, { useEffect, useState } from 'react';
import { Zap, User, LogOut, ShieldAlert, Database, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { useNavigate, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const [user, setUser] = useState<any>(null);
  const [clickCount, setClickCount] = useState(0);
  const [showAdminLink, setShowAdminLink] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const handleLogoClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount === 5) {
      setShowAdminLink(true);
    }
    if (newCount === 1 && location.pathname !== '/') {
      navigate('/');
    }
  };

  return (
    <nav className="glass" style={{
      position: 'fixed',
      top: '24px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '90%',
      maxWidth: '800px',
      padding: '12px 24px',
      borderRadius: '100px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '24px',
      zIndex: 1000
    }}>
      <div 
        style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontFamily: 'var(--font-heading)', cursor: 'pointer' }} 
        onClick={handleLogoClick}
      >
        <Zap size={22} color="var(--accent-primary)" fill="var(--accent-primary)" />
        <span style={{ letterSpacing: '0.1em' }}>ZENITH</span>
      </div>
      
      <div className="nav-links" style={{ display: 'flex', gap: '32px', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>
        <a href="#strategy" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>Architecture</a>
        <a href="#leads" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>Ecosystem</a>
        
        <AnimatePresence>
          {showAdminLink && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onClick={() => navigate('/admin')}
              style={{ color: 'var(--accent-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}
            >
              <Database size={16} /> Portal
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="auth-avatar" title={user.email}>
              <img src={user.user_metadata.avatar_url || 'https://via.placeholder.com/150'} alt="profile" />
            </div>
            <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '8px' }}>
              <LogOut size={20} />
            </button>
          </div>
        ) : (
          <button className="premium-button" onClick={handleLogin} style={{ padding: '10px 20px', fontSize: '0.85rem' }}>
             Access Intelligence
          </button>
        )}
      </div>
    </nav>
  );
};
