import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ShoppingCart, History, TrendingUp, ShieldCheck, MapPin } from 'lucide-react';

const MarketplaceCard = ({ asset, onBuy }) => {
    const [amount, setAmount] = useState(1);
    return (
        <motion.div className="glass" style={{ padding: '25px', background: 'white' }} whileHover={{ y: -5 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ShieldCheck color="var(--primary)" size={18} />
                    <span style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--primary-dark)' }}>Verified</span>
                </div>
                <span style={{ color: 'var(--primary-dark)', fontWeight: '700', fontSize: '1.1rem' }}>₹{asset.current_market_price || 952} <span style={{ fontSize: '0.8rem', fontWeight: '400', color: 'var(--text-muted)' }}>/ credit</span></span>
            </div>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>{asset.forest_id?.village_name} Forest Asset</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>
                <MapPin size={14} /> {asset.forest_id?.district}, {asset.forest_id?.state}
            </div>
            <div style={{ background: 'var(--bg-cream)', padding: '15px', borderRadius: '12px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Available Credits</span>
                    <span style={{ fontWeight: '700', color: 'var(--primary-dark)' }}>{asset.balance?.remaining_credits || 0} <span style={{ fontWeight: '400', color: 'var(--text-muted)' }}>/ {Math.floor(asset.total_carbon_tco2e)}</span></span>
                </div>
                <div style={{ width: '100%', height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{
                        width: `${(asset.balance?.remaining_credits / asset.total_carbon_tco2e) * 100}%`,
                        height: '100%',
                        background: 'var(--primary)'
                    }} />
                </div>
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '8px', fontWeight: '500' }}>Quantity (TCO2e)</label>
                <input
                    type="number"
                    className="glass"
                    style={{ width: '100%', padding: '10px', background: 'var(--bg-cream)' }}
                    value={amount}
                    onChange={(e) => setAmount(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                />
            </div>

            <button
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => onBuy(asset._id, amount)}
            >
                Purchase Credits
            </button>
        </motion.div>
    );
};

const CompanyDashboard = () => {
    const [marketplace, setMarketplace] = useState([]);
    const [history, setHistory] = useState([]);
    const [activeTab, setActiveTab] = useState('market');

    const fetchData = async () => {
        try {
            const { data: marketData } = await axios.get('http://localhost:5000/api/carbon/marketplace');
            setMarketplace(marketData);
            const { data: histData } = await axios.get('http://localhost:5000/api/transactions/history');
            setHistory(histData);
        } catch (err) { console.error(err); }
    };

    useEffect(() => { fetchData(); }, []);

    const handleBuy = async (carbonId, credits) => {
        try {
            await axios.post('http://localhost:5000/api/transactions/buy', {
                carbon_id: carbonId,
                credits_to_buy: credits
            });
            alert('Credits purchased successfully!');
            fetchData();
        } catch (err) {
            const msg = err.response?.data?.message || err.response?.data || 'Purchase failed';
            alert('Purchase failed: ' + msg);
        }
    };

    return (
        <div className="container" style={{ padding: '40px 20px' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <div>
                    <h1 style={{ fontSize: '2rem' }}>Corporate ESG Dashboard</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Offset your carbon footprint with verified local credits</p>
                </div>
                <div className="glass" style={{ display: 'flex', gap: '5px', padding: '5px', background: 'white' }}>
                    <button
                        className={`btn ${activeTab === 'market' ? 'btn-primary' : ''}`}
                        style={activeTab !== 'market' ? { background: 'transparent', color: 'var(--text-muted)' } : {}}
                        onClick={() => setActiveTab('market')}
                    >
                        <ShoppingCart size={18} /> Marketplace
                    </button>
                    <button
                        className={`btn ${activeTab === 'history' ? 'btn-primary' : ''}`}
                        style={activeTab !== 'history' ? { background: 'transparent', color: 'var(--text-muted)' } : {}}
                        onClick={() => setActiveTab('history')}
                    >
                        <History size={18} /> History
                    </button>
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px', marginBottom: '40px' }}>
                <div className="glass" style={{ padding: '30px', background: 'white' }}>
                    <h3 style={{ marginBottom: '20px', fontSize: '1.2rem' }}>ESG Impact Summary</h3>
                    <div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Total Credits Retired</p>
                        <h2 style={{ fontSize: '3rem', color: 'var(--primary-dark)', lineHeight: 1 }}>
                            {history.reduce((acc, t) => acc + t.credits_purchased, 0)} <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)', fontWeight: '500' }}>TCO2e</span>
                        </h2>
                    </div>
                </div>
                <div className="glass" style={{ padding: '30px', background: 'white' }}>
                    <h3 style={{ marginBottom: '20px', fontSize: '1.2rem' }}>Financial Overview</h3>
                    <div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Total ESG Investment</p>
                        <h2 style={{ fontSize: '3rem', color: 'var(--primary)', lineHeight: 1 }}>
                            ₹{history.reduce((acc, t) => acc + t.amount_paid_inr, 0).toLocaleString()}
                        </h2>
                    </div>
                </div>
            </div>

            {activeTab === 'market' ? (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <h3 style={{ marginBottom: '20px' }}>Verified Carbon Marketplace</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '30px' }}>
                        {marketplace.map(asset => (
                            <MarketplaceCard key={asset._id} asset={asset} onBuy={handleBuy} />
                        ))}
                    </div>
                </motion.div>
            ) : (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <h3 style={{ marginBottom: '20px' }}>Transaction Ledger</h3>
                    <div className="glass" style={{ padding: '0', overflow: 'hidden', background: 'white' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead style={{ background: 'var(--bg-cream)', borderBottom: '1px solid var(--glass-border)' }}>
                                <tr>
                                    <th style={{ padding: '20px', fontWeight: '600', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Date</th>
                                    <th style={{ padding: '20px', fontWeight: '600', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Asset ID</th>
                                    <th style={{ padding: '20px', fontWeight: '600', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Credits</th>
                                    <th style={{ padding: '20px', fontWeight: '600', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Amount</th>
                                    <th style={{ padding: '20px', fontWeight: '600', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Ledger Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {history.map(t => (
                                    <tr key={t._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '20px' }}>{new Date(t.timestamp).toLocaleDateString()}</td>
                                        <td style={{ padding: '20px' }}>
                                            <div style={{ fontWeight: '600' }}>{t.carbon_id?.forest_id?.village_name || 'Forest Asset'}</div>
                                            <div style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.carbon_id?._id?.slice(-8)}</div>
                                        </td>
                                        <td style={{ padding: '20px' }}>{t.credits_purchased} TCO2e</td>
                                        <td style={{ padding: '20px', fontWeight: '600' }}>₹{t.amount_paid_inr.toLocaleString()}</td>
                                        <td style={{ padding: '20px' }}>
                                            <span style={{ padding: '6px 12px', background: 'var(--primary-light)', color: 'var(--primary-dark)', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '700' }}>IMMUTABLE</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default CompanyDashboard;
