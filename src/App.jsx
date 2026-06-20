import { useState, useEffect } from 'react'
import Background3D from './components/Background3D/Background3D'
import Toolbar from './components/Toolbar/Toolbar'
import DesktopIcon from './components/Desktop/DesktopIcon'
import Window from './components/Window/Window'
import { apps, APP_ICONS, leftApps, rightApps } from './data/apps'

const TUX = '/images/tux.png'

function MobileOverlay() {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99999,
      background: 'linear-gradient(160deg, #1a1a1a 0%, #28041d 30%, #3d2440 55%, #28041d 80%, #1a1a1a 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      gap: 16, padding: 32, textAlign: 'center',
      fontFamily: "'Inter', -apple-system, sans-serif"
    }}>
      <div style={{
        width: 80, height: 80, borderRadius: 20,
        background: 'linear-gradient(135deg, #E95420, #77216F)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '2rem', fontWeight: 700, color: '#fff'
      }}>KM</div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', margin: 0 }}>Kenji Maeda</h1>
      <p style={{ fontSize: '0.9rem', color: '#E95420', fontWeight: 500, margin: 0 }}>
        Engenheiro de Software Mobile
      </p>
      <div style={{ maxWidth: 360, lineHeight: 1.7, color: '#999', fontSize: '0.82rem', marginTop: 8 }}>
        Para uma melhor experiência, abra este portfólio em um tablet ou desktop.
      </div>
      <div style={{
        display: 'flex', gap: 12, marginTop: 4,
        fontSize: '0.7rem', color: '#666'
      }}>
        <span>🖥 Desktop</span>
        <span>📱 Tablet</span>
      </div>
    </div>
  )
}

export default function Desktop() {
  const [open, setOpen] = useState(null)
  const [windows, setWindows] = useState({})
  const [photoViewer, setPhotoViewer] = useState(null)
  const [projectViewer, setProjectViewer] = useState(null)
  const [clock, setClock] = useState('')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const d = new Date()
      setClock(d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  if (isMobile) return <MobileOverlay />

  const openWindow = (id) => { setWindows(previous => ({ ...previous, [id]: true })); setOpen(id) }
  const closeWindow = (id) => { setWindows(previous => ({ ...previous, [id]: false })); setOpen(null) }
  const focusWindow = (id) => setOpen(id)

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'linear-gradient(160deg, #1a1a1a 0%, #28041d 30%, #3d2440 55%, #28041d 80%, #1a1a1a 100%)', display: 'flex', flexDirection: 'column', fontFamily: "'Inter', -apple-system, sans-serif", color: '#e0e0e0', overflow: 'hidden' }}>
      <Toolbar />
      <Background3D />

      <div style={{ position: 'fixed', top: 28, left: 0, right: 0, bottom: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 0, pointerEvents: 'none' }}>
        <img src={TUX} alt="" style={{ width: 280, height: 280, objectFit: 'contain', opacity: 0.55, filter: 'drop-shadow(0 0 40px rgba(0,0,0,0.5))' }} />
      </div>

      <div style={{ flex: 1, display: 'flex', gap: 80, padding: '28px 36px', zIndex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {leftApps.map(app => (
            <DesktopIcon key={app.id} app={app} onClick={() => openWindow(app.id)} />
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {rightApps.map(app => (
            <DesktopIcon key={app.id} app={app} onClick={() => openWindow(app.id)} />
          ))}
        </div>
      </div>

      {apps.map(app => windows[app.id] && (
        <Window key={app.id} app={app} isFocused={open === app.id}
          onClose={() => closeWindow(app.id)} onFocus={() => focusWindow(app.id)}
          onOpenRecs={() => openWindow('recs')}
          onOpenPhoto={(path) => { setPhotoViewer(path); openWindow('photo-viewer') }}
          onOpenProject={(project) => { setProjectViewer(project); openWindow('project-viewer') }} />
      ))}
      {photoViewer && (
        <Window key="photo-viewer" app={{ id: 'photo-viewer', label: 'Foto', color: '#77216F', photo: photoViewer }}
          isFocused={open === 'photo-viewer'}
          onClose={() => { setPhotoViewer(null); closeWindow('photo-viewer') }}
          onFocus={() => focusWindow('photo-viewer')} defaultPosition={{ x: 260, y: 120 }} />
      )}
      {projectViewer && (
        <Window key="project-viewer" app={{ id: 'project-viewer', label: projectViewer.label, color: '#77216F', project: projectViewer }}
          isFocused={open === 'project-viewer'}
          onClose={() => { setProjectViewer(null); closeWindow('project-viewer') }}
          onFocus={() => focusWindow('project-viewer')} defaultPosition={{ x: 260, y: 120 }} />
      )}

      <div style={{
        zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '6px 16px', gap: 6,
        background: 'rgba(44,0,30,0.92)', backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(233,84,32,0.2)'
      }}>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center', flex: 1 }}>
          {apps.map(app => {
              const DockIcon = APP_ICONS[app.id]
              const isWindowOpen = windows[app.id]
              return (
                <div key={app.id} onClick={() => isWindowOpen ? (open === app.id ? null : focusWindow(app.id)) : openWindow(app.id)}
                  style={{
                    width: 38, height: 38, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer',
                    background: isWindowOpen ? 'rgba(255,255,255,0.08)' : 'transparent',
                    border: isWindowOpen ? `1px solid ${app.color}30` : '1px solid transparent',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={event => { event.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
                  onMouseLeave={event => { event.currentTarget.style.background = isWindowOpen ? 'rgba(255,255,255,0.08)' : 'transparent' }}>
                  <DockIcon size={16} color={isWindowOpen ? app.color : '#888'} strokeWidth={1.5} />
                </div>
              )
            })}
        </div>
        <div style={{ fontSize: '0.75rem', color: '#888', fontWeight: 500, padding: '0 8px' }}>{clock}</div>
      </div>
    </div>
  )
}