import React from 'react'

const Loading: React.FC = () => {
  return (
    <div style={containerStyle} aria-busy="true" aria-label="Loading">
      <svg viewBox="0 0 50 50" style={svgStyle}>
        <defs>
          <linearGradient id="g" x1="0%" x2="100%">
            <stop offset="0%" stopColor="#4f46e5" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        <circle className="ring" cx="25" cy="25" r="20" fill="none" stroke="#e6e6e6" strokeWidth="4" />
        <circle className="segment" cx="25" cy="25" r="20" fill="none" stroke="url(#g)" strokeWidth="4" strokeLinecap="round" strokeDasharray="31.4 125.6" />
      </svg>
      <style>{`
        @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes dash { 0% { stroke-dasharray: 1 155; stroke-dashoffset: 0; } 50% { stroke-dasharray: 78 78; stroke-dashoffset: -20; } 100% { stroke-dasharray: 1 155; stroke-dashoffset: -125; } }
        svg { width: 56px; height: 56px; }
        .ring { opacity: 0.35; }
        .segment { transform-origin: 50% 50%; animation: rotate 1.8s linear infinite, dash 1.4s ease-in-out infinite; }
      `}</style>
    </div>
  )
}

const containerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '12px'
}

const svgStyle: React.CSSProperties = {
  display: 'block'
}

export default Loading