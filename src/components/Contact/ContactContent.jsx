import { ExternalLink, Send } from 'lucide-react'
import { links } from '../../data/links'

const LINK_ICONS = { LinkedIn: ExternalLink, GitHub: ExternalLink, Email: Send, YouTube: ExternalLink, Website: ExternalLink }

export default function ContactContent() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '16px 0' }}>
      {links.map(link => {
        const Icon = LINK_ICONS[link.name]
        return (
          <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', textDecoration: 'none',
              borderRadius: 10, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)',
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => { e.currentTarget.style.background = `${link.color}10`; e.currentTarget.style.borderColor = `${link.color}30`; e.currentTarget.style.transform = 'translateX(4px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)'; e.currentTarget.style.transform = 'none' }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0
            }}>
              <Icon size={18} color={link.color} strokeWidth={1.5} />
            </div>
            <span style={{ fontSize: '0.85rem', fontWeight: 500, color: '#ccc' }}>{link.name}</span>
          </a>
        )
      })}
    </div>
  )
}
