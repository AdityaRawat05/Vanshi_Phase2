import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Plus, MapPin, Leaf, Activity, IndianRupee, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const VillageDashboard = () => {
    const [forests, setForests] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        village_name: '', district: '', state: '',
        forest_area_ha: '', forest_type: 'Broadleaf',
        latitude: '', longitude: '', polygon: ''
    });

    const fetchForests = async () => {
        try {
            const { data } = await axios.get('https://backend-seven-phi-88.vercel.app/api/forests');
            setForests(data);
        } catch (err) { console.error(err); }
    };

    useEffect(() => { fetchForests(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let parsedPolygon = null;
            if (formData.polygon) {
                try {
                    parsedPolygon = JSON.parse(formData.polygon);
                } catch (e) {
                    alert("Invalid Polygon GeoJSON format");
                    return;
                }
            }

            await axios.post('https://backend-seven-phi-88.vercel.app/api/forests', {
                ...formData,
                location: {
                    latitude: formData.latitude,
                    longitude: formData.longitude,
                    polygon: parsedPolygon
                },
                polygon: parsedPolygon
            });
            setShowModal(false);
            setFormData({
                village_name: '', district: '', state: '',
                forest_area_ha: '', forest_type: 'Broadleaf',
                latitude: '', longitude: '', polygon: ''
            });
            fetchForests();
        } catch (err) { console.error(err); }
    };

    return (
        <div className="container" style={{ padding: '40px 20px' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <div>
                    <h1 style={{ fontSize: '2rem' }}>Village Forest Dashboard</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Manage your community forest carbon assets</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    <Plus size={20} /> Register New Forest
                </button>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' }}>
                <div className="glass" style={{ background: 'var(--primary-dark)', color: 'white', padding: '20px' }}>
                    <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>Total Area</p>
                    <h2 style={{ color: 'white' }}>{forests.reduce((acc, f) => acc + f.forest_area_ha, 0)} Ha</h2>
                </div>
                <div className="glass" style={{ padding: '20px', background: 'white' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Verified Forests</p>
                    <h2>{forests.filter(f => f.status === 'VERIFIED').length}</h2>
                </div>
                <div className="glass" style={{ padding: '20px', background: 'white' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Credits Sold</p>
                    <h2 style={{ color: 'var(--accent)' }}>{forests.reduce((acc, f) => acc + (f.sales_data?.sold_credits || 0), 0)} TCO2e</h2>
                </div>
                <div className="glass" style={{ padding: '20px', background: 'white' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Total Revenue</p>
                    <h2 style={{ color: 'var(--primary)' }}>₹{forests.reduce((acc, f) => acc + (f.sales_data?.revenue_earned || 0), 0).toLocaleString()}</h2>
                </div>
            </div>

            <h3 style={{ marginBottom: '20px' }}>Your Registered Forests</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
                {forests.map(forest => (
                    <motion.div key={forest._id} className="glass" style={{ padding: '25px', background: 'white' }} whileHover={{ y: -5 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                            <div style={{ padding: '10px', background: 'var(--primary-light)', borderRadius: '12px', color: 'var(--primary-dark)' }}>
                                <Leaf size={24} />
                            </div>
                            <span style={{
                                padding: '6px 14px',
                                borderRadius: '20px',
                                fontSize: '0.8rem',
                                fontWeight: '600',
                                background: forest.status === 'VERIFIED' ? 'var(--primary-light)' : '#fef9c3',
                                color: forest.status === 'VERIFIED' ? 'var(--primary-dark)' : '#854d0e'
                            }}>
                                {forest.status}
                            </span>
                        </div>
                        <h4 style={{ marginBottom: '5px', fontSize: '1.2rem' }}>{forest.village_name}</h4>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>
                            <MapPin size={14} /> {forest.district}, {forest.state}
                        </div>

                        {forest.sales_data && forest.sales_data.total_issued > 0 && (
                            <div style={{ background: 'var(--bg-cream)', padding: '15px', borderRadius: '12px', marginBottom: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '8px' }}>
                                    <span>Remaining Credits</span>
                                    <span style={{ fontWeight: '700', color: 'var(--primary-dark)' }}>{forest.sales_data.remaining_credits} / {forest.sales_data.total_issued}</span>
                                </div>
                                <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                                    <div style={{
                                        width: `${(forest.sales_data.remaining_credits / forest.sales_data.total_issued) * 100}%`,
                                        height: '100%',
                                        background: 'var(--primary)'
                                    }} />
                                </div>
                                <div style={{ marginTop: '10px', fontSize: '0.9rem', fontWeight: '600', color: 'var(--primary-dark)' }}>
                                    Earned: ₹{forest.sales_data.revenue_earned.toLocaleString()}
                                </div>
                            </div>
                        )}

                        <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '15px', display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                            <div>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Area</p>
                                <p style={{ fontWeight: '600' }}>{forest.forest_area_ha} Ha</p>
                            </div>
                            <div>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Type</p>
                                <p style={{ fontWeight: '600' }}>{forest.forest_type}</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {forest.status === 'VERIFIED' && forest.ndvi_data?.time_series && (
                                <div style={{ marginTop: '10px', marginBottom: '20px' }}>
                                    <h5 style={{ fontSize: '0.9rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <TrendingUp size={16} /> Vegetation Health (NDVI)
                                    </h5>
                                    <div style={{ height: '150px', marginLeft: '-10px' }}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={forest.ndvi_data.time_series}>
                                                <defs>
                                                    <linearGradient id={`colorNdvi-${forest._id}`} x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <XAxis dataKey="month" hide />
                                                <Tooltip
                                                    contentStyle={{ background: 'rgba(255, 255, 255, 0.9)', border: 'none', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                                                    itemStyle={{ color: '#064e3b', fontWeight: '600' }}
                                                />
                                                <Area type="monotone" dataKey="ndvi" stroke="#059669" fillOpacity={1} fill={`url(#colorNdvi-${forest._id})`} />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            )}

                            {forest.status === 'VERIFIED' && !forest.sales_data?.total_issued && (
                                <button
                                    className="btn btn-primary"
                                    style={{ width: '100%', justifyContent: 'center', fontSize: '0.9rem' }}
                                    onClick={async () => {
                                        try {
                                            await axios.post(`https://backend-seven-phi-88.vercel.app/api/forests/${forest._id}/activate`);
                                            alert('Carbon credits activated and listed on marketplace!');
                                            fetchForests();
                                        } catch (err) {
                                            alert(err.response?.data || 'Activation failed');
                                        }
                                    }}
                                >
                                    <Activity size={18} /> Activate Carbon Credits
                                </button>
                            )}

                            <button
                                className="btn"
                                style={{
                                    width: '100%',
                                    justifyContent: 'center',
                                    fontSize: '0.9rem',
                                    background: '#fee2e2',
                                    color: 'var(--danger)'
                                }}
                                onClick={async () => {
                                    if (window.confirm('Are you sure you want to remove this forest and all its carbon credits?')) {
                                        try {
                                            await axios.delete(`https://backend-seven-phi-88.vercel.app/api/forests/${forest._id}`);
                                            fetchForests();
                                        } catch (err) {
                                            alert('Failed to remove forest');
                                        }
                                    }
                                }}
                            >
                                Remove Forest
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {showModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
                    <div className="glass" style={{ width: '100%', maxWidth: '500px', padding: '30px', background: 'white' }}>
                        <h2 style={{ marginBottom: '20px' }}>Register Forest</h2>
                        <form onSubmit={handleSubmit}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                <div style={{ marginBottom: '15px' }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', fontWeight: '500' }}>Village Name</label>
                                    <input type="text" className="glass" style={{ width: '100%', padding: '10px', background: 'var(--bg-cream)' }} value={formData.village_name} onChange={e => setFormData({ ...formData, village_name: e.target.value })} required />
                                </div>
                                <div style={{ marginBottom: '15px' }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', fontWeight: '500' }}>District</label>
                                    <input type="text" className="glass" style={{ width: '100%', padding: '10px', background: 'var(--bg-cream)' }} value={formData.district} onChange={e => setFormData({ ...formData, district: e.target.value })} required />
                                </div>
                            </div>
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', fontWeight: '500' }}>State</label>
                                <input type="text" className="glass" style={{ width: '100%', padding: '10px', background: 'var(--bg-cream)' }} value={formData.state} onChange={e => setFormData({ ...formData, state: e.target.value })} required />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                <div style={{ marginBottom: '15px' }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', fontWeight: '500' }}>Latitude</label>
                                    <input type="number" step="any" className="glass" style={{ width: '100%', padding: '10px', background: 'var(--bg-cream)' }} value={formData.latitude} onChange={e => setFormData({ ...formData, latitude: e.target.value })} required />
                                </div>
                                <div style={{ marginBottom: '15px' }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', fontWeight: '500' }}>Longitude</label>
                                    <input type="number" step="any" className="glass" style={{ width: '100%', padding: '10px', background: 'var(--bg-cream)' }} value={formData.longitude} onChange={e => setFormData({ ...formData, longitude: e.target.value })} required />
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                <div style={{ marginBottom: '15px' }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', fontWeight: '500' }}>Area (Ha)</label>
                                    <input type="number" className="glass" style={{ width: '100%', padding: '10px', background: 'var(--bg-cream)' }} value={formData.forest_area_ha} onChange={e => setFormData({ ...formData, forest_area_ha: e.target.value })} required />
                                </div>
                                <div style={{ marginBottom: '15px' }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', fontWeight: '500' }}>Forest Type</label>
                                    <select className="glass" style={{ width: '100%', padding: '10px', background: 'var(--bg-cream)' }} value={formData.forest_type} onChange={e => setFormData({ ...formData, forest_type: e.target.value })}>
                                        <option>Broadleaf</option>
                                        <option>Mixed</option>
                                        <option>Pine</option>
                                        <option>Degraded</option>
                                    </select>
                                </div>
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', fontWeight: '500' }}>Polygon (GeoJSON Coordinates) <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>(Optional)</span></label>
                                <textarea
                                    className="glass"
                                    style={{ width: '100%', padding: '10px', height: '80px', fontFamily: 'monospace', background: 'var(--bg-cream)', fontSize: '0.8rem' }}
                                    placeholder='[[[77.1, 28.5], ...]]'
                                    value={formData.polygon}
                                    onChange={e => setFormData({ ...formData, polygon: e.target.value })}
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '15px' }}>
                                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>Register Forest</button>
                                <button type="button" className="btn" style={{ background: '#e2e8f0', color: 'var(--text-main)' }} onClick={() => setShowModal(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div >
            )}
        </div >
    );
};

export default VillageDashboard;
