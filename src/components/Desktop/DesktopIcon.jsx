import { useState } from 'react'
import { APP_ICONS } from '../../data/apps'

export default function DesktopIcon({ app, onClick }) {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = APP_ICONS[app.id]
  return (
    <div onClick={onClick}
      onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        width: 90, cursor: 'pointer', padding: 12, borderRadius: 12,
        transition: 'all 0.2s', userSelect: 'none',
        background: isHovered ? 'rgba(255,255,255,0.04)' : 'transparent'
      }}>
      <div style={{
        width: 56, height: 56, borderRadius: 14, display: 'flex', alignItems: 'center',
        justifyContent: 'center',
        background: isHovered ? '#77216F18' : 'rgba(255,255,255,0.03)',
        border: `1px solid ${isHovered ? '#77216F40' : 'rgba(255,255,255,0.06)'}`,
        backdropFilter: 'blur(8px)', transition: 'all 0.2s'
      }}>
        <Icon size={24} color={isHovered ? '#77216F' : '#ccc'} strokeWidth={1.5} />
      </div>
      <span style={{ fontSize: '0.68rem', color: isHovered ? '#77216F' : '#888', textAlign: 'center', lineHeight: 1.3, transition: 'color 0.2s' }}>{app.label}</span>
    </div>
  )
}