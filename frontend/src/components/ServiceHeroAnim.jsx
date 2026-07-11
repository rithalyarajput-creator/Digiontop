import './ServiceHeroAnim.css';

/*
  Reusable, dependency-free animated hero visual for service pages.
  Pass `variant` to pick a theme-matched animation. Each variant is pure
  CSS/SVG — no images, fast, and responsive.

  Variants: 'seo' | 'web' | 'social' | 'ecommerce' | 'ads' | 'mobile'
            | 'branding' | 'content' | 'analytics' | 'default'
*/
export default function ServiceHeroAnim({ variant = 'default', label }) {
  return (
    <div className={`sha sha--${variant}`} role="img" aria-label={label || `${variant} illustration`}>
      <span className="sha__glow" aria-hidden="true" />
      <div className="sha__stage" aria-hidden="true">
        {renderVariant(variant)}
      </div>
    </div>
  );
}

function renderVariant(v) {
  switch (v) {
    case 'seo':
      return (
        <>
          <div className="sha-card sha-card--search">
            <span className="sha-dot" /><span className="sha-line sha-line--w60" />
          </div>
          <div className="sha-card sha-card--rank">
            <span className="sha-rankbar" style={{ '--h': '38%', '--d': '0s' }} />
            <span className="sha-rankbar" style={{ '--h': '62%', '--d': '.15s' }} />
            <span className="sha-rankbar" style={{ '--h': '80%', '--d': '.3s' }} />
            <span className="sha-rankbar" style={{ '--h': '100%', '--d': '.45s' }} />
          </div>
          <div className="sha-badge sha-badge--num">#1</div>
          <div className="sha-chip sha-chip--float"><Arrow /> +34%</div>
        </>
      );
    case 'web':
      return (
        <>
          <div className="sha-window">
            <span className="sha-dots"><i /><i /><i /></span>
            <span className="sha-code sha-code--w80" />
            <span className="sha-code sha-code--w60" />
            <span className="sha-code sha-code--w70" />
            <span className="sha-code sha-code--w40" />
          </div>
          <div className="sha-badge sha-badge--tag">&lt;/&gt;</div>
          <div className="sha-chip sha-chip--float">100 / 100</div>
        </>
      );
    case 'social':
      return (
        <>
          <div className="sha-card sha-card--post">
            <span className="sha-avatar" />
            <span className="sha-line sha-line--w50" />
            <span className="sha-media" />
            <span className="sha-react"><Heart /> <Heart /> <Heart /></span>
          </div>
          <div className="sha-badge sha-badge--heart"><Heart /></div>
          <div className="sha-chip sha-chip--float"><Arrow /> Viral</div>
        </>
      );
    case 'ecommerce':
      return (
        <>
          <div className="sha-card sha-card--product">
            <span className="sha-thumb" />
            <span className="sha-line sha-line--w60" />
            <span className="sha-price">₹1,299</span>
            <span className="sha-stars">★★★★★</span>
          </div>
          <div className="sha-badge sha-badge--cart"><Cart /></div>
          <div className="sha-chip sha-chip--float"><Arrow /> Sold</div>
        </>
      );
    case 'ads':
      return (
        <>
          <div className="sha-card sha-card--target">
            <span className="sha-ring sha-ring--1" />
            <span className="sha-ring sha-ring--2" />
            <span className="sha-ring sha-ring--3" />
            <span className="sha-bull" />
          </div>
          <div className="sha-badge sha-badge--roi">5x ROI</div>
          <div className="sha-chip sha-chip--float"><Arrow /> CTR ↑</div>
        </>
      );
    case 'mobile':
      return (
        <>
          <div className="sha-phone">
            <span className="sha-notch" />
            <span className="sha-appicon" style={{ '--d': '0s' }} />
            <span className="sha-appicon" style={{ '--d': '.2s' }} />
            <span className="sha-appicon" style={{ '--d': '.4s' }} />
            <span className="sha-appicon" style={{ '--d': '.6s' }} />
          </div>
          <div className="sha-badge sha-badge--tag">APP</div>
          <div className="sha-chip sha-chip--float">4.9 ★</div>
        </>
      );
    case 'branding':
      return (
        <>
          <div className="sha-card sha-card--palette">
            <span className="sha-swatch" style={{ '--c': '#F5A800', '--d': '0s' }} />
            <span className="sha-swatch" style={{ '--c': '#14182b', '--d': '.15s' }} />
            <span className="sha-swatch" style={{ '--c': '#e1306c', '--d': '.3s' }} />
            <span className="sha-swatch" style={{ '--c': '#2b9348', '--d': '.45s' }} />
          </div>
          <div className="sha-badge sha-badge--logo">D</div>
          <div className="sha-chip sha-chip--float">Brand ✦</div>
        </>
      );
    case 'content':
      return (
        <>
          <div className="sha-card sha-card--doc">
            <span className="sha-line sha-line--w70" />
            <span className="sha-line sha-line--w90" />
            <span className="sha-line sha-line--w50" />
            <span className="sha-line sha-line--w80" />
          </div>
          <div className="sha-badge sha-badge--pen">✎</div>
          <div className="sha-chip sha-chip--float"><Arrow /> Rank</div>
        </>
      );
    case 'analytics':
      return (
        <>
          <div className="sha-card sha-card--chart">
            <svg viewBox="0 0 120 60" className="sha-graph">
              <polyline points="0,50 24,38 48,42 72,20 96,26 120,6" />
            </svg>
            <span className="sha-rankbar" style={{ '--h': '40%', '--d': '0s' }} />
            <span className="sha-rankbar" style={{ '--h': '70%', '--d': '.2s' }} />
            <span className="sha-rankbar" style={{ '--h': '90%', '--d': '.4s' }} />
          </div>
          <div className="sha-badge sha-badge--num">↑</div>
          <div className="sha-chip sha-chip--float">+128%</div>
        </>
      );
    default:
      return (
        <>
          <div className="sha-card sha-card--rank">
            <span className="sha-rankbar" style={{ '--h': '45%', '--d': '0s' }} />
            <span className="sha-rankbar" style={{ '--h': '68%', '--d': '.15s' }} />
            <span className="sha-rankbar" style={{ '--h': '88%', '--d': '.3s' }} />
            <span className="sha-rankbar" style={{ '--h': '100%', '--d': '.45s' }} />
          </div>
          <div className="sha-badge sha-badge--num">✦</div>
          <div className="sha-chip sha-chip--float"><Arrow /> Grow</div>
        </>
      );
  }
}

const Arrow = () => (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M9 7h8v8" /></svg>
);
const Heart = () => (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M12 21s-7-4.5-9.5-9C.8 8.5 2 5 5.5 5 7.7 5 9 6.5 12 9c3-2.5 4.3-4 6.5-4C22 5 23.2 8.5 21.5 12 19 16.5 12 21 12 21z" /></svg>
);
const Cart = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" /></svg>
);
