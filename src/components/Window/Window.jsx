import { useState, useEffect } from 'react'
import ProfileContent from '../Profile/ProfileContent'
import SkillsContent from '../Skills/SkillsContent'
import RecsContent from '../Recs/RecsContent'
import ProjContent from '../Projects/ProjContent'
import ProjectViewerContent from '../Projects/ProjectViewerContent'
import ServicesContent from '../Services/ServicesContent'
import ContactContent from '../Contact/ContactContent'
import PhotosContent from '../Photos/PhotosContent'
import PhotoViewerContent from '../Photos/PhotoViewerContent'
import ArticlesContent from '../Articles/ArticlesContent'

const WINDOW_SIZES = {
  recs: { width: 620, height: 460 },
  projects: { width: 560, height: 460 },
  contact: { width: 480, height: 360 },
  photos: { width: 620, height: 460 },
  'photo-viewer': { width: 860, height: 640 },
  'project-viewer': { width: 620, height: 520 },
  articles: { width: 560, height: 400 },
}

const DEFAULT_SIZE = { width: 520, height: 400 }

function getWindowSize(appId) {
  return WINDOW_SIZES[appId] || DEFAULT_SIZE
}

function shouldRemovePadding(appId) {
  return appId === 'photo-viewer' || appId === 'project-viewer'
}

function shouldHideOverflow(appId) {
  return appId === 'photo-viewer' || appId === 'project-viewer'
}

export default function Window({ app, isFocused, onClose, onFocus, onOpenRecs, onOpenPhoto, onOpenProject, defaultPosition }) {
  const [position, setPosition] = useState(defaultPosition || { x: 80 + Math.random() * 120, y: 50 + Math.random() * 80 })
  const [isDragging, setIsDragging] = useState(null)
  const { width, height } = getWindowSize(app.id)

  const handleMouseDown = (event) => {
    onFocus()
    setIsDragging({ x: event.clientX - position.x, y: event.clientY - position.y })
  }

  useEffect(() => {
    if (!isDragging) return
    const handleMouseMove = (event) => setPosition({
      x: Math.max(0, Math.min(window.innerWidth - 200, event.clientX - isDragging.x)),
      y: Math.max(0, event.clientY - isDragging.y),
    })
    const handleMouseUp = () => setIsDragging(null)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => { window.removeEventListener('mousemove', handleMouseMove); window.removeEventListener('mouseup', handleMouseUp) }
  }, [isDragging])

  return (
    <div onClick={onFocus}
      style={{
        position: 'fixed', left: position.x, top: position.y, width, height,
        zIndex: isFocused ? 50 : 40,
        borderRadius: 12, overflow: 'hidden',
        boxShadow: isFocused ? `0 20px 80px rgba(0,0,0,0.6), 0 0 0 1px ${app.color}20` : '0 12px 40px rgba(0,0,0,0.4)',
        background: 'rgba(18,18,26,0.95)', backdropFilter: 'blur(24px)',
        border: `1px solid ${isFocused ? `${app.color}30` : 'rgba(255,255,255,0.04)'}`,
        transition: 'box-shadow 0.3s, border-color 0.3s'
      }}>
      <div onMouseDown={handleMouseDown} style={{
        display: 'flex', alignItems: 'center', padding: '10px 14px',
        cursor: 'grab', userSelect: 'none',
        background: isFocused ? 'rgba(255,255,255,0.04)' : 'transparent',
        borderBottom: '1px solid rgba(255,255,255,0.04)'
      }}>
        <div style={{ display: 'flex', gap: 6, marginRight: 12 }}>
          <div onClick={(event) => { event.stopPropagation(); onClose() }} style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f57', cursor: 'pointer' }} />
          <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#28c840' }} />
        </div>
        <span style={{ fontSize: '0.75rem', color: '#888', fontWeight: 500, letterSpacing: '0.5px' }}>{app.label}</span>
      </div>
      <div style={{
        padding: shouldRemovePadding(app.id) ? 0 : 16,
        height: 'calc(100% - 42px)',
        overflow: shouldHideOverflow(app.id) ? 'hidden' : 'auto'
      }}>
        {app.id === 'profile' && <ProfileContent />}
        {app.id === 'skills' && <SkillsContent />}
        {app.id === 'recs' && <RecsContent />}
        {app.id === 'projects' && <ProjContent onOpenProject={onOpenProject} />}
        {app.id === 'services' && <ServicesContent onOpenRecs={onOpenRecs} />}
        {app.id === 'contact' && <ContactContent />}
        {app.id === 'photos' && <PhotosContent onOpenPhoto={onOpenPhoto} />}
        {app.id === 'photo-viewer' && <PhotoViewerContent photo={app.photo} />}
        {app.id === 'project-viewer' && <ProjectViewerContent project={app.project} />}
        {app.id === 'articles' && <ArticlesContent />}
      </div>
    </div>
  )
}