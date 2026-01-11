import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await login(email, password);
            if (user.role === 'VILLAGE') navigate('/village');
            else if (user.role === 'COMPANY') navigate('/company');
            else if (user.role === 'ADMIN') navigate('/admin');
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="hero-bg" style={{ minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <div className="glass" style={{ width: '100%', maxWidth: '400px', padding: '40px', background: 'rgba(255, 255, 255, 0.8)' }}>
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <div style={{ display: 'inline-flex', padding: '15px', background: 'var(--primary-light)', borderRadius: '50%', color: 'var(--primary-dark)', marginBottom: '15px' }}>
                        <LogIn size={32} />
                    </div>
                    <h2 style={{ fontSize: '2rem' }}>Welcome Back</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Sign in to manage your carbon assets</p>
                </div>

                {error && <div style={{ background: '#fee2e2', color: '#991b1b', padding: '12px', borderRadius: '12px', marginBottom: '20px', fontSize: '0.9rem', textAlign: 'center' }}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>Email Address</label>
                        <input
                            type="email"
                            className="glass"
                            style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #cbd5e1', background: 'white' }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '30px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>Password</label>
                        <input
                            type="password"
                            className="glass"
                            style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #cbd5e1', background: 'white' }}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '1rem' }}>
                        Login to Account
                    </button>
                </form>
                <p style={{ textAlign: 'center', marginTop: '25px', fontSize: '0.95rem' }}>
                    Don't have an account? <Link to="/register" style={{ color: 'var(--primary-dark)', fontWeight: '700', textDecoration: 'none' }}>Register here</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
