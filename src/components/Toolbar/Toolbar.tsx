import { useState, useEffect } from 'react'
import { Monitor, Wifi, Smartphone, Bluetooth, Battery } from 'lucide-react'
import { version as APP_VERSION } from '../../../package.json'

export default function Toolbar() {
  const [clock, setClock] = useState('')
  const [aboutOpen, setAboutOpen] = useState(false)
  const today = new Date().toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric', month: 'short' }).replace('.', '')

  useEffect(() => {
    const interval = setInterval(() => {
      const d = new Date()
      setClock(d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const close = () => { if (aboutOpen) setAboutOpen(false) }
    window.addEventListener('click', close)
    return () => window.removeEventListener('click', close)
  }, [aboutOpen])

  return (
    <div style={{ height: 28, background: 'rgba(30,0,20,0.85)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 14px', zIndex: 200, flexShrink: 0, WebkitUserSelect: 'none', userSelect: 'none', fontSize: '0.7rem' }}>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 6 }}>
        <Monitor size={15} strokeWidth={1.5} color="#ccc" style={{ cursor: 'pointer' }} onClick={(e: React.MouseEvent) => { e.stopPropagation(); setAboutOpen(!aboutOpen) }} />
        {aboutOpen && (
          <div style={{ position: 'absolute', top: 32, left: 0, width: 280, background: 'rgba(30,0,20,0.96)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: 16, zIndex: 9999, boxShadow: '0 12px 40px rgba(0,0,0,0.6)' }}>
            <div style={{ textAlign: 'center', marginBottom: 12 }}>
              <Monitor size={32} strokeWidth={1} color="#E95420" />
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff', marginTop: 6 }}>Portfolio</div>
              <div style={{ fontSize: '0.65rem', color: '#888' }}>Versão {APP_VERSION || '0.0.0'}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: '0.7rem', color: '#999' }}>
              <div><span style={{ color: '#666' }}>Desenvolvedor:</span> Ricardo Kenji Vivas Maeda</div>
              <div><span style={{ color: '#666' }}>Serial:</span> KVM-{APP_VERSION || '0.0.0'}-{Math.random().toString(36).slice(2, 8).toUpperCase()}</div>
              <div><span style={{ color: '#666' }}>Memória:</span> 48 GB</div>
              <div><span style={{ color: '#666' }}>Armazenamento:</span> 1 TB SSD</div>
              <div><span style={{ color: '#666' }}>Processador:</span> Apple M4 Pro</div>
              <div><span style={{ color: '#666' }}>Sistema:</span> PortfolioOS 1.0</div>
              <a href="https://github.com/kenjimaeda54?tab=repositories" target="_blank" rel="noopener noreferrer" style={{ color: '#E95420', textDecoration: 'none', marginTop: 4 }}>Código fonte →</a>
            </div>
          </div>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Wifi size={13} strokeWidth={1.8} color="#aaa" />
        <Smartphone size={13} strokeWidth={1.8} color="#aaa" />
        <Bluetooth size={13} strokeWidth={1.8} color="#aaa" />
        <Battery size={14} strokeWidth={1.8} color="#aaa" />
        <span style={{ color: '#999', fontSize: '0.65rem' }}>{today}</span>
        <span style={{ color: '#ccc', fontWeight: 500, fontSize: '0.72rem' }}>{clock}</span>
      </div>
    </div>
  )
}