import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StrategyCanvas } from './components/StrategyCanvas';
import { LeadForm } from './components/LeadForm';
import { AdminDashboard } from './components/AdminDashboard';
import { supabase } from './lib/supabase';

function LandingPage({ onStart, onAudit }: { onStart: () => void, onAudit: () => void }) {
  return (
    <>
      <Hero onStart={onStart} />
      <StrategyCanvas onAudit={onAudit} />
      <section id="leads" className="section-container" style={{ textAlign: 'center' }}>
        <div className="glass" style={{ borderRadius: '24px', padding: '80px 40px' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Monetize Your Expertise</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 32px' }}>
            Zenith isn't just a tool; it's a lead generation engine. Every strategy session is a high-intent conversation starter with your ideal clients.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'left', minWidth: '200px' }}>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--accent-primary)' }}>$2k+</div>
              <div style={{ color: 'var(--text-secondary)' }}>Avg. Audit Value</div>
            </div>
            <div style={{ textAlign: 'left', minWidth: '200px' }}>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--accent-primary)' }}>40%</div>
              <div style={{ color: 'var(--text-secondary)' }}>Conversion Rate</div>
            </div>
            <div style={{ textAlign: 'left', minWidth: '200px' }}>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--accent-primary)' }}>10min</div>
              <div style={{ color: 'var(--text-secondary)' }}>Setup Time</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function App() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [user, setUser] = React.useState<any>(null);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <Router>
      <div className="app">
        <div className="bg-blobs">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
        </div>
        
        <Navbar />
        
        <main>
          <Routes>
            <Route path="/" element={
              <LandingPage onStart={() => setIsModalOpen(true)} onAudit={() => setIsModalOpen(true)} />
            } />
            <Route path="/admin" element={
              user ? <AdminDashboard /> : <Navigate to="/" />
            } />
          </Routes>
          
          <LeadForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </main>

        <footer style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
          © 2026 Zenith OS. Built for the Infinite Game.
        </footer>
      </div>
    </Router>
  );
}

export default App;
