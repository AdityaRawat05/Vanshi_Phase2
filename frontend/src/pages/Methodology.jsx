import { motion } from 'framer-motion';
import { Layers, Activity, ShieldCheck, Database, Server, Leaf, Lock, CheckCircle, AlertTriangle } from 'lucide-react';

const Methodology = () => {
    const sections = [
        {
            title: "1. Forest Onboarding & Spatial Validation",
            icon: Map,
            content: (
                <div>
                    <p>Users submit latitude, longitude, and claimed forest area. The backend automatically generates a polygon using the central coordinate and claimed area. This prevents exaggerated or fake land claims.</p>
                    <div style={{ marginTop: '10px', padding: '15px', background: 'var(--bg-cream)', borderRadius: '8px', borderLeft: '4px solid var(--primary)' }}>
                        <strong>Output:</strong> A standardized forest boundary stored in the database with status set to PENDING.
                    </div>
                </div>
            )
        },
        {
            title: "2. Satellite-Based Forest Verification (NDVI)",
            icon: Layers,
            content: (
                <div>
                    <p>We use Sentinel-2 (ESA) satellite imagery via Google Earth Engine. NDVI is calculated over the entire forest polygon using Red (B4) and Near-Infrared (B8) bands: <code>NDVI = (NIR − RED) / (NIR + RED)</code>.</p>
                    <div style={{ marginTop: '10px', padding: '15px', background: 'var(--bg-cream)', borderRadius: '8px', borderLeft: '4px solid var(--primary)' }}>
                        <strong>Output:</strong> NDVI value, forest health class, confidence score, and timestamp.
                    </div>
                </div>
            )
        },
        {
            title: "3. Forest Health Classification & Eligibility Gating",
            icon: Activity,
            content: (
                <div>
                    <p>Forests are automatically classified based on NDVI thresholds. If NDVI &lt; 0.30, the forest is rejected. No manual overrides allowed.</p>
                    <table style={{ width: '100%', marginTop: '10px', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                        <thead>
                            <tr style={{ background: 'var(--primary-light)' }}>
                                <th style={{ padding: '8px', textAlign: 'left' }}>NDVI Range</th>
                                <th style={{ padding: '8px', textAlign: 'left' }}>Classification</th>
                                <th style={{ padding: '8px', textAlign: 'left' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>≥ 0.65</td><td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Dense</td><td style={{ padding: '8px', borderBottom: '1px solid #eee', color: 'var(--success)' }}>Eligible</td></tr>
                            <tr><td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>0.45–0.65</td><td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Moderate</td><td style={{ padding: '8px', borderBottom: '1px solid #eee', color: 'var(--success)' }}>Eligible</td></tr>
                            <tr><td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>0.30–0.45</td><td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Sparse</td><td style={{ padding: '8px', borderBottom: '1px solid #eee', color: 'var(--warning)' }}>Limited</td></tr>
                            <tr><td style={{ padding: '8px' }}>&lt; 0.30</td><td style={{ padding: '8px' }}>Poor</td><td style={{ padding: '8px', color: 'var(--danger)' }}>Rejected</td></tr>
                        </tbody>
                    </table>
                </div>
            )
        },
        {
            title: "4. Carbon Sequestration Calculation",
            icon: Leaf,
            content: (
                <div>
                    <p>VANSHI uses rule-based, conservative carbon accounting. Formula: <code>Annual Credits = Forest Area × Carbon Rate</code>.</p>
                    <div style={{ marginTop: '10px', padding: '15px', background: 'var(--bg-cream)', borderRadius: '8px', borderLeft: '4px solid var(--primary)' }}>
                        <strong>Design Rationale:</strong> Rule-based logic ensures transparency, explainability, and auditability.
                    </div>
                </div>
            )
        },
        {
            title: "5. Admin Verification Layer",
            icon: ShieldCheck,
            content: (
                <div>
                    <p>Admins review satellite output and logs to verify pipeline correctness. They cannot edit NDVI values or carbon rates manually.</p>
                    <div style={{ marginTop: '10px', padding: '15px', background: 'var(--bg-cream)', borderRadius: '8px', borderLeft: '4px solid var(--primary)' }}>
                        <strong>Outcome:</strong> Forest status updated to VERIFIED. Eligible for credit issuance.
                    </div>
                </div>
            )
        },
        {
            title: "6. Carbon Asset Creation & Credit Accounting",
            icon: Database,
            content: (
                <div>
                    <p><strong>Carbon Asset:</strong> Created once per verified forest (Static).<br /><strong>Credit Balance:</strong> Tracks issued, sold, and remaining credits (Dynamic).</p>
                    <div style={{ marginTop: '10px', padding: '15px', background: 'var(--bg-cream)', borderRadius: '8px', borderLeft: '4px solid var(--primary)' }}>
                        <strong>Rationale:</strong> Separating static and dynamic data prevents double counting.
                    </div>
                </div>
            )
        },
        {
            title: "7. Blockchain Integration",
            icon: Lock,
            content: (
                <div>
                    <p>Blockchain is used for credit issuance, ownership tracking, and retirement. It is NOT used for heavy computations like NDVI.</p>
                    <ul style={{ paddingLeft: '20px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        <li>Token Model: ERC-1155</li>
                        <li>Purpose: Economic finality</li>
                    </ul>
                </div>
            )
        },
        {
            title: "8. Credit Purchase & Retirement",
            icon: CheckCircle,
            content: (
                <div>
                    <p>Companies purchase verified credits. Retired credits are burned on-chain to prevent resale.</p>
                    <div style={{ marginTop: '10px', padding: '15px', background: 'var(--bg-cream)', borderRadius: '8px', borderLeft: '4px solid var(--primary)' }}>
                        <strong>Impact:</strong> Burning ensures no double counting—a major flaw in traditional markets.
                    </div>
                </div>
            )
        },
        {
            title: "9. Scalability Strategy (MVP to Enterprise)",
            icon: Server,
            content: (
                <div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>1. Frontend Scaling</h3>
                    <ul style={{ paddingLeft: '20px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        <li><strong>MVP:</strong> Vercel/Netlify deployment with standard caching.</li>
                        <li><strong>Growth:</strong> Cloudflare CDN (Edge Cache), Lazy loading components, WebP image optimization.</li>
                        <li><strong>Scale:</strong> Multi-region CDN, Service Workers for offline support, RUM analytics.</li>
                        <li><strong>Enterprise:</strong> Edge computing (Workers), Micro-frontends.</li>
                    </ul>

                    <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', marginTop: '20px' }}>2. Backend Scaling</h3>
                    <ul style={{ paddingLeft: '20px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        <li><strong>MVP:</strong> Single Node.js instance (PM2), SQLite/Postgres.</li>
                        <li><strong>Growth:</strong> Horizontal scaling (3-5 instances) + Load Balancer (Nginx). Redis for session/API caching.</li>
                        <li><strong>Scale:</strong> Microservices breakdown (Auth, Forest, Carbon), Event-driven architecture (RabbitMQ), Read replicas.</li>
                        <li><strong>Enterprise:</strong> Kubernetes orchestration (EKS/GKE) with auto-scaling pods.</li>
                    </ul>

                    <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', marginTop: '20px' }}>3. Satellite Processing (GEE) Scaling</h3>
                    <ul style={{ paddingLeft: '20px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        <li><strong>MVP:</strong> Sequential processing, single worker.</li>
                        <li><strong>Growth:</strong> Async Job Queue (Celery/Bull), 3-8 concurrent workers, Result caching (30 days).</li>
                        <li><strong>Scale:</strong> Batch GEE requests, Pre-compute NDVI nightly, Temporal caching.</li>
                        <li><strong>Enterprise:</strong> Distributed workers on K8s jobs, Geospatial tiling.</li>
                    </ul>

                    <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', marginTop: '20px' }}>4. Database Scaling</h3>
                    <ul style={{ paddingLeft: '20px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        <li><strong>MVP:</strong> Single instance, automated backups.</li>
                        <li><strong>Growth:</strong> Primary + Read Replica. Connection pooling (PgBouncer). Time-series partitioning.</li>
                        <li><strong>Scale:</strong> Sharding by user/forest region. TimescaleDB extension for NDVI data.</li>
                        <li><strong>Enterprise:</strong> Multi-region active-active mesh.</li>
                    </ul>

                    <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', marginTop: '20px' }}>5. Blockchain Scaling</h3>
                    <ul style={{ paddingLeft: '20px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        <li><strong>MVP:</strong> Polygon PoS Mainnet.</li>
                        <li><strong>Growth:</strong> Batch minting (ERC-1155), Gasless transactions (Biconomy).</li>
                        <li><strong>Scale:</strong> Layer-2 Rollups (zkEVM) for high throughput.</li>
                    </ul>

                    <div style={{ marginTop: '20px', padding: '15px', background: 'var(--bg-cream)', borderRadius: '8px', borderLeft: '4px solid var(--primary)' }}>
                        <strong>Benefit:</strong> Architecture designed to transition from 100 to 100,000+ users without fundamental rewriting.
                    </div>
                </div>
            )
        },
        {
            title: "10. Error Handling & Reliability Design",
            icon: AlertTriangle,
            content: (
                <div>
                    <div style={{ padding: '15px', background: '#fee2e2', borderRadius: '8px', color: '#991b1b', marginBottom: '20px' }}>
                        <strong>Design Assumption:</strong> VANSHI is designed with the assumption that failures are inevitable. Satellite APIs fail, networks break, transactions get delayed, and human errors occur. <br /><br />
                        <strong>Core Principle:</strong> Failures may delay progress, but they must never corrupt trust, data integrity, or ownership.
                    </div>

                    <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', marginTop: '20px' }}>2.1 Input & Validation Errors</h3>
                    <ul style={{ paddingLeft: '20px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        <li><strong>Handling:</strong> Strict backend validation for all user inputs. Geometry and area constraints enforced. Invalid requests rejected immediately. No satellite processing triggered.</li>
                    </ul>

                    <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', marginTop: '20px' }}>2.2 Calculation & Model Errors</h3>
                    <ul style={{ paddingLeft: '20px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        <li><strong>Handling:</strong> Fixed and transparent NDVI formula. Stable cloud-masking pipeline. Explicit outputs from deterministic inputs.</li>
                    </ul>

                    <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', marginTop: '20px' }}>2.3 External API Failures (Satellite / RPC)</h3>
                    <ul style={{ paddingLeft: '20px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        <li><strong>Handling:</strong> Satellite verification runs asynchronously. Jobs are queued with automatic retries (exponential backoff). Forest remains in PENDING_VERIFICATION state. UI shows progress, not failure.</li>
                    </ul>

                    <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', marginTop: '20px' }}>2.4 Asynchronous Job Failures</h3>
                    <ul style={{ paddingLeft: '20px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        <li><strong>Handling:</strong> Durable job queues with idempotency keys. Dead-letter queue for repeated failures. Graceful shutdown mechanisms.</li>
                    </ul>

                    <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', marginTop: '20px' }}>2.5 Database Failures</h3>
                    <ul style={{ paddingLeft: '20px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        <li><strong>Handling:</strong> Replica sets for high availability. Majority write concern for critical operations. Periodic reconciliation with blockchain state.</li>
                    </ul>

                    <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', marginTop: '20px' }}>2.6 Concurrency & Race Conditions</h3>
                    <ul style={{ paddingLeft: '20px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        <li><strong>Handling:</strong> One-time verification-to-mint mapping. Backend checks before minting. Credit burn mechanism prevents reuse.</li>
                    </ul>

                    <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', marginTop: '20px' }}>2.7 Blockchain-Specific Failures</h3>
                    <ul style={{ paddingLeft: '20px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        <li><strong>Handling:</strong> Minting finalized only after confirmations. Atomic transactions (all-or-nothing). Failed transactions leave system state unchanged.</li>
                    </ul>

                    <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', marginTop: '20px' }}>2.8 Storage & Security</h3>
                    <ul style={{ paddingLeft: '20px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        <li><strong>Handling:</strong> Metadata hashes stored securely. Role-based access control. Backend-only mint authorization. Emergency pause procedures.</li>
                    </ul>

                    <div style={{ marginTop: '20px', padding: '15px', background: 'var(--bg-cream)', borderRadius: '8px', borderLeft: '4px solid var(--primary)' }}>
                        <strong>Core Safety Guarantees:</strong>
                        <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
                            <li>No carbon credit is minted without verification.</li>
                            <li>No carbon credit is counted more than once.</li>
                            <li>No retired credit can ever be reused.</li>
                            <li>External failures never compromise trust or ownership.</li>
                        </ul>
                    </div>

                    <p style={{ marginTop: '20px', fontStyle: 'italic', color: 'var(--text-muted)' }}>
                        "VANSHI treats failures as expected conditions. Errors may delay verification or transactions, but trust, data integrity, and ownership are never compromised."
                    </p>
                </div>
            )
        }
    ];

    return (
        <div style={{ paddingTop: '100px', paddingBottom: '60px', background: 'var(--bg-cream)', minHeight: '100vh' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <span style={{ color: 'var(--primary)', fontWeight: '600', letterSpacing: '1px' }}>TRANSPARENCY FIRST</span>
                    <h1 style={{ fontSize: '3rem', marginTop: '10px', marginBottom: '20px' }}>How VANSHI Works</h1>
                    <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.2rem', color: 'var(--text-muted)' }}>
                        A step-by-step breakdown of our independent ecological verification and immutable carbon accounting.
                    </p>
                </div>

                <div style={{ display: 'grid', gap: '30px' }}>
                    {sections.map((section, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass"
                            style={{ padding: '30px', background: 'white', display: 'grid', gridTemplateColumns: 'minmax(50px, auto) 1fr', gap: '20px' }}
                        >
                            <div style={{
                                width: '50px', height: '50px',
                                background: 'var(--primary-light)',
                                borderRadius: '12px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: 'var(--primary-dark)'
                            }}>
                                <section.icon size={24} />
                            </div>
                            <div>
                                <h2 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>{section.title}</h2>
                                <div style={{ color: 'var(--text-main)', lineHeight: '1.6' }}>
                                    {section.content}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Helper for icon since Map is reserved
function Map(props) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 12 15 6 21 12 21 18 15 21 9 15 3 21 3 6" /></svg>
    );
}

export default Methodology;
