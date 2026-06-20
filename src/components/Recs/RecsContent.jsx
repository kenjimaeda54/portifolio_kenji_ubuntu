import { useState } from 'react'
import { recs } from '../../data/recs'

export default function RecsContent() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const selectedRec = recs[selectedIndex]
  return (
    <div style={{ display: 'flex', gap: 16, height: '100%' }}>
      <div style={{ width: 170, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
        {recs.map((rec, index) => (
          <div key={index} onClick={() => setSelectedIndex(index)}
            style={{
              padding: '8px 12px', borderRadius: 8, cursor: 'pointer', fontSize: '0.75rem',
              background: selectedIndex === index ? `${rec.color}12` : 'transparent',
              border: selectedIndex === index ? `1px solid ${rec.color}30` : '1px solid transparent',
              color: selectedIndex === index ? rec.color : '#888', fontWeight: selectedIndex === index ? 600 : 400,
              transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 8
            }}>
            <img src={rec.face} alt={rec.name}
              style={{ width: 26, height: 26, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{rec.name.split(' ')[0]}</span>
          </div>
        ))}
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <a href={selectedRec.linkedin} target="_blank" rel="noopener noreferrer" style={{
          display: 'flex', gap: 14, alignItems: 'center', padding: '10px 14px',
          borderRadius: 10, background: `${selectedRec.color}08`, border: `1px solid ${selectedRec.color}15`,
          transition: 'all 0.2s', textDecoration: 'none', color: 'inherit'
        }}
        onMouseEnter={e => { e.currentTarget.style.background = `${selectedRec.color}15` }}
        onMouseLeave={e => { e.currentTarget.style.background = `${selectedRec.color}08` }}>
          <img src={selectedRec.face} alt={selectedRec.name} style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${selectedRec.color}40` }} />
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: selectedRec.color }}>{selectedRec.name}</div>
            <div style={{ fontSize: '0.65rem', color: '#666' }}>{selectedRec.title}</div>
            <div style={{ fontSize: '0.65rem', color: '#555', marginTop: 4 }}>View on LinkedIn &rarr;</div>
          </div>
        </a>
        <div style={{
          flex: 1, padding: 14, borderRadius: 10,
          background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)',
          fontSize: '0.82rem', lineHeight: 1.7, color: '#bbb', fontStyle: 'italic'
        }}>
          {selectedRec.text}
        </div>
      </div>
    </div>
  )
}
