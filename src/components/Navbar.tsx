import React, { useEffect, useState } from 'react';
import { Zap, User, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const [user, setUser] = useState<any>(null);
  const [clickCount, setClickCount] = useState(0);
  const [showAdminLink, setShowAdminLink] = useState(false);
  const navigate = useNavigate();

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
  };

  const handleLogoClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount === 5) {
      setShowAdminLink(true);
      // Reset after 10 seconds
      setTimeout(() => {
        setShowAdminLink(false);
        setClickCount(0);
      }, 10000);
    }
    if (newCount === 1) {
      navigate('/');
    }
  };

  return (
    <nav className="glass" style={{
      position: 'fixed',
      top: '24px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 'max-content',
      minWidth: '600px',
      padding: '12px 24px',
      borderRadius: '100px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '32px',
      zIndex: 1000
    }}>
      <div 
        style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontFamily: 'var(--font-heading)', cursor: 'pointer' }} 
        onClick={handleLogoClick}
      >
        <Zap size={20} color="var(--accent-primary)" fill="var(--accent-primary)" />
        ZENITH
      </div>
      
      <div style={{ display: 'flex', gap: '24px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
        <a href="#strategy" style={{ color: 'inherit', textDecoration: 'none' }}>Strategy</a>
        <a href="#leads" style={{ color: 'inherit', textDecoration: 'none' }}>Clients</a>
        {showAdminLink && (
          <motion.a 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            href="/admin" 
            style={{ color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 600 }}
          >
            Intelligence Portal
          </motion.a>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="auth-avatar">
              <img src={user.user_metadata.avatar_url} alt="profile" />
            </div>
            <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <LogOut size={18} />
            </button>
          </div>
        ) : (
          <button className="premium-button" onClick={handleLogin} style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
            <User size={16} /> Login
          </button>
        )}
      </div>
    </nav>
  );
};
