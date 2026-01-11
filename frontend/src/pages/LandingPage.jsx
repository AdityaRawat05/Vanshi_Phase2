import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheck, Users, TrendingUp, ArrowRight, Leaf, Lock, CheckCircle, XCircle, Globe, Activity, Layers, Database } from 'lucide-react';

const LandingPage = () => {
    const fadeIn = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <div className="landing-page">
            {/* 1. Hero Section */}
            <section className="hero-bg" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(6,78,59,0.5), rgba(0,0,0,0.8))', zIndex: 1 }}></div>
                <div className="container" style={{ position: 'relative', zIndex: 10, color: 'white', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '50px', alignItems: 'center' }}>
                    <motion.div initial="hidden" animate="visible" variants={fadeIn}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.15)', padding: '8px 16px', borderRadius: '30px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', marginBottom: '30px' }}>
                            <span style={{ width: '8px', height: '8px', background: '#34d399', borderRadius: '50%' }}></span>
                            <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>Live on Sentinel-2 Satellite Feed</span>
                        </div>
                        <h1 style={{ fontSize: '4rem', lineHeight: 1.1, marginBottom: '25px', fontWeight: '700' }}>
                            The Future of <br />
                            <span style={{ background: 'linear-gradient(to right, #34d399, #10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Trusted Carbon.</span>
                        </h1>
                        <p style={{ fontSize: '1.25rem', opacity: 0.9, lineHeight: 1.6, marginBottom: '40px', maxWidth: '600px' }}>
                            VANSHI bridges the trust gap in carbon markets. We use satellite data and blockchain to verify ecological truth before economic value is ever created.
                        </p>
                        <div style={{ display: 'flex', gap: '20px' }}>
                            <Link to="/register" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1.1rem' }}>
                                Start Onboarding <ArrowRight size={20} />
                            </Link>
                            <Link to="/methodology" className="btn" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', backdropFilter: 'blur(5px)', border: '1px solid rgba(255,255,255,0.2)', padding: '16px 32px', fontSize: '1.1rem', textDecoration: 'none' }}>
                                How it Works
                            </Link>
                        </div>
                    </motion.div>

                    {/* Hero Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="glass"
                        style={{ padding: '30px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '15px' }}>
                            <div>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '5px' }}>Live Forest Verification</h3>
                                <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>Analyzing 127 Active Polygons</p>
                            </div>
                            <Activity color="#34d399" />
                        </div>
                        <div style={{ display: 'grid', gap: '15px' }}>
                            {[1, 2, 3].map(i => (
                                <div key={i} style={{ background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <div style={{ width: '40px', height: '40px', background: '#064e3b', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Leaf size={20} color="#34d399" />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                            <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>Sector {String.fromCharCode(64 + i)}-24</span>
                                            <span style={{ fontSize: '0.8rem', color: '#34d399' }}>Verified</span>
                                        </div>
                                        <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
                                            <div style={{ width: `${85 + i * 5}%`, height: '100%', background: '#34d399', borderRadius: '2px' }}></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 2. The Problem */}
            <section style={{ padding: '100px 0', background: '#FAFAF9' }}>
                <div className="container">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        style={{ textAlign: 'center', marginBottom: '60px' }}
                    >
                        <span style={{ color: '#ef4444', fontWeight: '600', letterSpacing: '1px', fontSize: '0.9rem' }}>THE BROKEN MARKET</span>
                        <h2 style={{ fontSize: '3rem', marginTop: '10px', marginBottom: '20px', color: '#1f2937' }}>Carbon Markets Fail Where <br /> Trust Is Missing.</h2>
                        <p style={{ fontSize: '1.5rem', fontWeight: '500', color: '#374151', padding: '10px 20px', background: '#fee2e2', display: 'inline-block', borderRadius: '8px' }}>
                            The problem is not carbon trading. The problem is trust at scale.
                        </p>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
                        {[
                            { title: 'For Villages', icon: Users, items: ['Protect forests for free', 'No access to carbon markets', 'High verification costs'], color: '#f87171' },
                            { title: 'For Companies', icon: ShieldCheck, items: ['Cannot verify credit authenticity', 'Risk of "Phantom Credits"', 'No proof of real impact'], color: '#fb923c' },
                            { title: 'For the Market', icon: Globe, items: ['Manual, slow audits', 'Centralized, opaque registries', 'No scalability'], color: '#60a5fa' }
                        ].map((card, i) => (
                            <motion.div
                                key={i}
                                variants={fadeIn}
                                transition={{ delay: i * 0.1 }}
                                className="glass"
                                style={{ padding: '40px', background: 'white' }}
                            >
                                <div style={{ width: '60px', height: '60px', background: `${card.color}20`, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '25px', color: card.color }}>
                                    <card.icon size={30} />
                                </div>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', color: '#1f2937' }}>{card.title}</h3>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {card.items.map((item, idx) => (
                                        <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', color: '#4b5563' }}>
                                            <XCircle size={16} color={card.color} /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. How Vanshi Helps Villages */}
            <section style={{ padding: '100px 0', background: 'white' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
                        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <span style={{ color: 'var(--primary)', fontWeight: '600', letterSpacing: '1px' }}>EMPOWERMENT ENGINE</span>
                            <h2 style={{ fontSize: '3rem', marginTop: '10px', marginBottom: '30px' }}>How VANSHI Empowers <br /> Forest Communities</h2>
                            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '40px' }}>
                                {[
                                    'Villages register forest location once',
                                    'No expensive field surveys required',
                                    'No auditors or middlemen taking cuts',
                                    'Forest health verified by satellites',
                                    'Income linked directly to forest quality'
                                ].map((item, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px', fontSize: '1.1rem' }}>
                                        <CheckCircle size={20} color="var(--primary)" /> {item}
                                    </li>
                                ))}
                            </ul>
                            <div style={{ padding: '20px', background: 'var(--primary-light)', borderRadius: '12px', borderLeft: '4px solid var(--primary)' }}>
                                <strong style={{ color: 'var(--primary-dark)', display: 'block', marginBottom: '5px' }}>Impact:</strong>
                                Fair valuation of conservation. Transparent earnings. Long-term incentive to protect forests.
                            </div>
                        </motion.div>
                        <div className="glass" style={{ height: '500px', background: 'var(--bg-cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                            {/* Visual Placeholder: Village Dashboard */}
                            <div style={{ textAlign: 'center', opacity: 0.5 }}>
                                <Users size={80} color="var(--primary-dark)" />
                                <p style={{ fontWeight: '600', marginTop: '20px' }}>Community Dashboard View</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. How Vanshi Helps Companies */}
            <section style={{ padding: '100px 0', background: '#FAFAF9' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
                        <div className="glass" style={{ height: '500px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', order: 2 }}>
                            {/* Visual Placeholder: Company Dashboard */}
                            <div style={{ textAlign: 'center', opacity: 0.5 }}>
                                <TrendingUp size={80} color="var(--accent)" />
                                <p style={{ fontWeight: '600', marginTop: '20px' }}>Corporate ESG Dashboard</p>
                            </div>
                        </div>
                        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} style={{ order: 1 }}>
                            <span style={{ color: 'var(--accent)', fontWeight: '600', letterSpacing: '1px' }}>VERIFIED IMPACT</span>
                            <h2 style={{ fontSize: '3rem', marginTop: '10px', marginBottom: '30px' }}>How Companies Get <br /> Trusted Carbon Credits</h2>
                            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '40px' }}>
                                {[
                                    'Credits verified by raw satellite data',
                                    'Clear, published carbon calculation logic',
                                    'On-chain ownership & retirement tracking',
                                    'Public proof of credit retirement'
                                ].map((item, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px', fontSize: '1.1rem' }}>
                                        <CheckCircle size={20} color="var(--accent)" /> {item}
                                    </li>
                                ))}
                            </ul>
                            <div style={{ padding: '20px', background: '#fff7ed', borderRadius: '12px', borderLeft: '4px solid var(--accent)' }}>
                                <strong style={{ color: '#9a3412', display: 'block', marginBottom: '5px' }}>Benefit:</strong>
                                Zero Greenwashing. Audit-ready ESG reporting. Confidence in real climate impact.
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 5. What Makes Vanshi Unique (Comparison) */}
            <section style={{ padding: '100px 0', background: 'var(--primary-dark)', color: 'white' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <h2 style={{ fontSize: '3rem', marginBottom: '20px' }}>Why VANSHI Is Different</h2>
                        <p style={{ fontSize: '1.5rem', color: '#34d399', fontWeight: '600' }}>VANSHI verifies carbon before it is traded.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', maxWidth: '1000px', margin: '0 auto' }}>
                        <div style={{ padding: '40px', background: 'rgba(255,255,255,0.05)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '30px', opacity: 0.8 }}>Traditional Carbon Platforms</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: '#fca5a5' }}><XCircle /> Manual verification</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: '#fca5a5' }}><XCircle /> Expensive audits</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: '#fca5a5' }}><XCircle /> Trust intermediaries</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: '#fca5a5' }}><XCircle /> Opaque data</div>
                            </div>
                        </div>
                        <div style={{ padding: '40px', background: 'rgba(16, 185, 129, 0.2)', borderRadius: '24px', border: '1px solid #34d399', position: 'relative' }}>
                            <div style={{ position: 'absolute', top: '-15px', right: '30px', background: '#34d399', color: '#064e3b', padding: '5px 15px', borderRadius: '20px', fontWeight: 'bold', fontSize: '0.8rem' }}>RECOMMENDED</div>
                            <h3 style={{ fontSize: '2rem', marginBottom: '30px', fontWeight: '700' }}>VANSHI</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: '#white', fontWeight: '500' }}><CheckCircle color="#34d399" /> Satellite-verified forests</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: '#white', fontWeight: '500' }}><CheckCircle color="#34d399" /> Rule-based carbon accounting</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: '#white', fontWeight: '500' }}><CheckCircle color="#34d399" /> Blockchain-secured ownership</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: '#white', fontWeight: '500' }}><CheckCircle color="#34d399" /> Transparent & auditable</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Philosophy */}
            <section style={{ padding: '100px 0', background: 'white' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <span style={{ color: 'var(--text-muted)', fontWeight: '600', letterSpacing: '1px' }}>CORE DESIGN PHILOSOPHY</span>
                        <h2 style={{ fontSize: '3rem', marginTop: '10px' }}>Trust by Design</h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                        <div className="glass" style={{ padding: '40px', background: 'var(--bg-cream)', textAlign: 'center' }}>
                            <div style={{ width: '80px', height: '80px', background: '#dcfce7', borderRadius: '50%', margin: '0 auto 25px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Layers size={40} color="var(--primary)" />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Ecological Truth (Off-Chain)</h3>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Satellites observe forests. NDVI measures vegetation health. Our backend applies rigorous science.</p>
                            <div style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--primary-dark)' }}>"Nature is verified by satellites."</div>
                        </div>
                        <div className="glass" style={{ padding: '40px', background: 'var(--bg-cream)', textAlign: 'center' }}>
                            <div style={{ width: '80px', height: '80px', background: '#e0f2fe', borderRadius: '50%', margin: '0 auto 25px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Lock size={40} color="#0284c7" />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Economic Truth (On-Chain)</h3>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Carbon credits issued. Ownership recorded securely. Credits retired permanently on-chain.</p>
                            <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#0369a1' }}>"Value is guaranteed by blockchain."</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. Why Vanshi Matters */}
            <section style={{ padding: '80px 0', background: '#f8fafc', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '40px' }}>Why VANSHI Matters</h2>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
                        {['Lower Verification Costs', 'Access for Small Communities', 'Scalable Architecture', 'Transparent Markets'].map((item, i) => (
                            <span key={i} style={{ padding: '10px 20px', background: 'white', borderRadius: '30px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', fontWeight: '500', color: 'var(--text-main)' }}>
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* 8. CTA */}
            <section style={{ padding: '80px 0', background: 'linear-gradient(to right, #064e3b, #111827)', color: 'white', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '30px' }}>Join the Future of Carbon</h2>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                        <Link to="/register" className="btn btn-primary" style={{ padding: '16px 40px', fontSize: '1.2rem' }}>
                            Get Started
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
