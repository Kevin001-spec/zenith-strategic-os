import React, { useEffect, useState } from 'react';
import { Zap, User, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const Navbar = () => {
  const [user, setUser] = useState<any>(null);

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
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontFamily: 'var(--font-heading)', cursor: 'pointer' }} onClick={() => window.location.href = '/'}>
        <Zap size={20} color="var(--accent-primary)" fill="var(--accent-primary)" />
        ZENITH
      </div>
      
      <div style={{ display: 'flex', gap: '24px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
        <a href="#strategy" style={{ color: 'inherit', textDecoration: 'none' }}>Strategy</a>
        <a href="#leads" style={{ color: 'inherit', textDecoration: 'none' }}>Clients</a>
        <a href="/admin" style={{ color: 'inherit', textDecoration: 'none', opacity: user ? 1 : 0.2 }}>Intelligence</a>
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
