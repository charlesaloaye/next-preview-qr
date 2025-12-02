import { useState } from 'react';

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '40px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        textAlign: 'center',
        maxWidth: '500px',
        width: '100%'
      }}>
        <h1 style={{
          fontSize: '48px',
          marginBottom: '20px',
          color: '#333'
        }}>
          🚀 Next.js Preview QR
        </h1>
        <p style={{
          fontSize: '18px',
          color: '#666',
          marginBottom: '30px'
        }}>
          This is an example Next.js app with QR code preview!
        </p>
        <div style={{
          marginTop: '30px',
          padding: '20px',
          background: '#f5f5f5',
          borderRadius: '10px'
        }}>
          <p style={{
            fontSize: '24px',
            marginBottom: '20px',
            color: '#333'
          }}>
            Counter: {count}
          </p>
          <button
            onClick={() => setCount(count + 1)}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              background: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'background 0.2s'
            }}
            onMouseOver={(e) => e.target.style.background = '#5568d3'}
            onMouseOut={(e) => e.target.style.background = '#667eea'}
          >
            Increment
          </button>
        </div>
        <p style={{
          marginTop: '30px',
          fontSize: '14px',
          color: '#999'
        }}>
          Scan the QR code in your terminal to open this on your mobile device!
        </p>
      </div>
    </div>
  );
}

