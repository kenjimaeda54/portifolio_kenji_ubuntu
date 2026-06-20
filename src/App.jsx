import { useState, useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { User, Zap, MessageSquareText, FolderOpen, Wrench, Send, ExternalLink, Image } from 'lucide-react'

const TUX = '/images/tux.png'

const APP_ICONS = {
  profile: User, skills: Zap, recs: MessageSquareText,
  projects: FolderOpen, services: Wrench, contact: Send, photos: Image,
}

const apps = [
  { id: 'profile', label: 'Perfil', color: '#E95420' },
  { id: 'skills', label: 'Habilidades', color: '#77216F' },
  { id: 'recs', label: 'Recomendações', color: '#E95420' },
  { id: 'projects', label: 'Projetos', color: '#77216F' },
  { id: 'services', label: 'Serviços', color: '#AEA79F' },
  { id: 'contact', label: 'Contato', color: '#E95420' },
  { id: 'photos', label: 'Fotos', color: '#77216F' },
]

const recs = [
  { name: 'Marileia Rocha', title: 'Assistente Social Corporativa', text: 'Tenho acompanhado o trabalho voluntário de Ricardo no desenvolvimento do aplicativo da Ciclar e destaco seu comprometimento, responsabilidade e dedicação.', linkedin: 'https://www.linkedin.com/in/marileiarocha/', face: '/images/faces/marileia.jpg', color: '#AEA79F' },
  { name: 'Cledir Girotto', title: 'Founder na Mopi | PM', text: 'Ricardo entende muito de iOS e se esforçou para contornar as barreiras impostas pelo sistema operacional. Recomendo o trabalho dele!', linkedin: 'https://www.linkedin.com/in/cledirgirotto/', face: '/images/faces/cledir.jpg', color: '#AEA79F' },
  { name: 'Luiz Gabriel Bianchi', title: 'React Native | iOS Dev', text: 'Trabalhei 2 meses com Ricardo em melhorias de performance. Conhecimento sólido em React Native, Flutter, Swift. Código de qualidade.', linkedin: 'https://www.linkedin.com/in/luizgabrielrebelatto/', face: '/images/faces/luiz.jpg', color: '#AEA79F' },
  { name: 'Carlos Oliveira', title: 'Front-end | React & Next.js', text: 'Profissionalismo e gentileza. Busca excelência nos projetos e está sempre disposto a ajudar com as melhores práticas.', linkedin: 'https://www.linkedin.com/in/carlos-oliveira-ab93941a1/', face: '/images/faces/carlos.jpg', color: '#AEA79F' },
]

const links = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/kenjimaeda1233/', color: '#fff' },
  { name: 'GitHub', url: 'https://github.com/kenjimaeda54', color: '#fff' },
  { name: 'Email', url: 'mailto:kenjimaedafamily@gmail.com', color: '#fff' },
  { name: 'YouTube', url: 'https://www.youtube.com/@kenjiMaeda-Ti', color: '#fff' },
  { name: 'Website', url: 'https://kvm-skills.onrender.com', color: '#fff' },
]

function Particles({ count = 300 }) {
  const pos = useMemo(() => {
    const p = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) p[i * 3] = (Math.random() - 0.5) * 40, p[i * 3 + 1] = (Math.random() - 0.5) * 30, p[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5
    return p
  }, [count])
  const ref = useRef()
  useFrame(({ clock }) => { if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.003 })
  return (
    <points ref={ref}>
      <bufferGeometry><bufferAttribute attach="attributes-position" count={count} array={pos} itemSize={3} /></bufferGeometry>
      <pointsMaterial size={0.08} color="#E95420" transparent opacity={0.2} sizeAttenuation depthWrite={false} />
    </points>
  )
}

function Background3D() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }} gl={{ antialias: true, alpha: true }} dpr={[1, 1.5]} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
      <ambientLight intensity={0.3} />
      <Particles />
      <mesh position={[-5, 3, -3]} scale={0.3}>
        <icosahedronGeometry />
        <meshStandardMaterial color="#E95420" roughness={0.5} metalness={0.3} transparent opacity={0.08} wireframe />
      </mesh>
      <mesh position={[5, -3, -4]} scale={0.35}>
        <dodecahedronGeometry />
        <meshStandardMaterial color="#77216F" roughness={0.5} metalness={0.3} transparent opacity={0.06} wireframe />
      </mesh>
    </Canvas>
  )
}

function DesktopIcon({ app, onClick }) {
  const [h, setH] = useState(false)
  const Icon = APP_ICONS[app.id]
  return (
    <div onClick={onClick}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        width: 90, cursor: 'pointer', padding: 12, borderRadius: 12,
        transition: 'all 0.2s', userSelect: 'none',
        background: h ? 'rgba(255,255,255,0.04)' : 'transparent'
      }}>
      <div style={{
        width: 56, height: 56, borderRadius: 14, display: 'flex', alignItems: 'center',
        justifyContent: 'center',
        background: h ? '#77216F18' : 'rgba(255,255,255,0.03)',
        border: `1px solid ${h ? '#77216F40' : 'rgba(255,255,255,0.06)'}`,
        backdropFilter: 'blur(8px)', transition: 'all 0.2s'
      }}>
        <Icon size={24} color={h ? '#77216F' : '#ccc'} strokeWidth={1.5} />
      </div>
      <span style={{ fontSize: '0.68rem', color: h ? '#77216F' : '#888', textAlign: 'center', lineHeight: 1.3, transition: 'color 0.2s' }}>{app.label}</span>
    </div>
  )
}

export default function Desktop() {
  const [open, setOpen] = useState(null)
  const [windows, setWindows] = useState({})
  const [photoViewer, setPhotoViewer] = useState(null)
  const [projectViewer, setProjectViewer] = useState(null)
  const [clock, setClock] = useState('')

  useEffect(() => {
    const t = setInterval(() => {
      const d = new Date()
      setClock(d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }))
    }, 1000)
    return () => clearInterval(t)
  }, [])

  const openWindow = (id) => { setWindows(p => ({ ...p, [id]: true })); setOpen(id) }
  const closeWindow = (id) => { setWindows(p => ({ ...p, [id]: false })); setOpen(null) }
  const focusWindow = (id) => setOpen(id)

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'linear-gradient(160deg, #1a1a1a 0%, #28041d 30%, #3d2440 55%, #28041d 80%, #1a1a1a 100%)', display: 'flex', flexDirection: 'column', fontFamily: "'Inter', -apple-system, sans-serif", color: '#e0e0e0', overflow: 'hidden' }}>
      <Background3D />

      {/* Tux central */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, pointerEvents: 'none' }}>
        <img src={TUX} alt="" style={{ width: 280, height: 280, objectFit: 'contain', opacity: 0.55, filter: 'drop-shadow(0 0 40px rgba(0,0,0,0.5))' }} />
      </div>

      {/* Desktop icons - two columns */}
      <div style={{ flex: 1, display: 'flex', gap: 80, padding: '28px 36px', zIndex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {apps.slice(0, 4).map(a => (
            <DesktopIcon key={a.id} app={a} onClick={() => openWindow(a.id)} />
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {apps.slice(4).map(a => (
            <DesktopIcon key={a.id} app={a} onClick={() => openWindow(a.id)} />
          ))}
        </div>
      </div>

      {/* Windows */}
      {apps.map(a => windows[a.id] && (
        <Window key={a.id} app={a} isFocused={open === a.id}
          onClose={() => closeWindow(a.id)} onFocus={() => focusWindow(a.id)}
          onOpenRecs={() => openWindow('recs')}
          onOpenPhoto={(path) => { setPhotoViewer(path); openWindow('photo-viewer') }}
          onOpenProject={(proj) => { setProjectViewer(proj); openWindow('project-viewer') }} />
      ))}
      {photoViewer && (
        <Window key="photo-viewer" app={{ id: 'photo-viewer', label: 'Foto', color: '#77216F', photo: photoViewer }}
          isFocused={open === 'photo-viewer'}
          onClose={() => { setPhotoViewer(null); closeWindow('photo-viewer') }}
          onFocus={() => focusWindow('photo-viewer')} />
      )}
      {projectViewer && (
        <Window key="project-viewer" app={{ id: 'project-viewer', label: projectViewer.label, color: '#77216F', project: projectViewer }}
          isFocused={open === 'project-viewer'}
          onClose={() => { setProjectViewer(null); closeWindow('project-viewer') }}
          onFocus={() => focusWindow('project-viewer')} />
      )}

      {/* Dock */}
      <div style={{
        zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '6px 16px', gap: 6,
        background: 'rgba(44,0,30,0.92)', backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(233,84,32,0.2)'
      }}>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center', flex: 1 }}>
          {apps.map(a => {
              const DockIcon = APP_ICONS[a.id]
              return (
                <div key={a.id} onClick={() => windows[a.id] ? (open === a.id ? null : focusWindow(a.id)) : openWindow(a.id)}
                  style={{
                    width: 38, height: 38, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer',
                    background: windows[a.id] ? 'rgba(255,255,255,0.08)' : 'transparent',
                    border: windows[a.id] ? `1px solid ${a.color}30` : '1px solid transparent',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = windows[a.id] ? 'rgba(255,255,255,0.08)' : 'transparent' }}>
                  <DockIcon size={16} color={windows[a.id] ? a.color : '#888'} strokeWidth={1.5} />
                </div>
              )
            })}
        </div>
        <div style={{ fontSize: '0.75rem', color: '#888', fontWeight: 500, padding: '0 8px' }}>{clock}</div>
      </div>
    </div>
  )
}

/* ─── WINDOW ─── */
function Window({ app, isFocused, onClose, onFocus, onOpenRecs, onOpenPhoto, onOpenProject }) {
  const [pos, setPos] = useState({ x: 80 + Math.random() * 120, y: 50 + Math.random() * 80 })
  const [drag, setDrag] = useState(null)

  const isRecs = app.id === 'recs'
  const isProj = app.id === 'projects'
  const isContact = app.id === 'contact'
  const isPhotos = app.id === 'photos'
  const isPhotoViewer = app.id === 'photo-viewer'
  const isProjectViewer = app.id === 'project-viewer'
  const w = isRecs ? 620 : isProj ? 560 : isContact ? 480 : isPhotos ? 620 : isPhotoViewer ? 860 : isProjectViewer ? 620 : 520
  const h = isRecs ? 460 : isProj ? 460 : isContact ? 360 : isPhotos ? 460 : isPhotoViewer ? 640 : isProjectViewer ? 520 : 400

  const handleMouseDown = (e) => {
    onFocus()
    setDrag({ x: e.clientX - pos.x, y: e.clientY - pos.y })
  }

  useEffect(() => {
    if (!drag) return
    const mousemove = (e) => setPos({ x: Math.max(0, Math.min(window.innerWidth - 200, e.clientX - drag.x)), y: Math.max(0, e.clientY - drag.y) })
    const mouseup = () => setDrag(null)
    window.addEventListener('mousemove', mousemove)
    window.addEventListener('mouseup', mouseup)
    return () => { window.removeEventListener('mousemove', mousemove); window.removeEventListener('mouseup', mouseup) }
  }, [drag])

  return (
    <div onClick={onFocus}
      style={{
        position: 'fixed', left: pos.x, top: pos.y, width: w, height: h,
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
          <div onClick={(e) => { e.stopPropagation(); onClose() }} style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f57', cursor: 'pointer' }} />
          <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#28c840' }} />
        </div>
        <span style={{ fontSize: '0.75rem', color: '#888', fontWeight: 500, letterSpacing: '0.5px' }}>{app.label}</span>
      </div>
      <div style={{ padding: (app.id === 'photo-viewer' || app.id === 'project-viewer') ? 0 : 16, height: 'calc(100% - 42px)', overflow: (app.id === 'photo-viewer' || app.id === 'project-viewer') ? 'hidden' : 'auto' }}>
        {app.id === 'profile' && <ProfileContent />}
        {app.id === 'skills' && <SkillsContent />}
        {app.id === 'recs' && <RecsContent />}
        {app.id === 'projects' && <ProjContent onOpenProject={onOpenProject} />}
        {app.id === 'services' && <ServicesContent onOpenRecs={onOpenRecs} />}
        {app.id === 'contact' && <ContactContent />}
        {app.id === 'photos' && <PhotosContent onOpenPhoto={onOpenPhoto} />}
        {app.id === 'photo-viewer' && <PhotoViewerContent photo={app.photo} />}
        {app.id === 'project-viewer' && <ProjectViewerContent project={app.project} />}
      </div>
    </div>
  )
}

/* ─── CONTENT ─── */
function ProfileContent() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16, padding: '20px 16px' }}>
      <img src="/src/assets/perfil.jpeg" alt="Kenji Maeda"
        style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', alignSelf: 'center' }} />
      <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#fff', alignSelf: 'center' }}>Kenji Maeda</h1>
      <p style={{ fontSize: '0.85rem', color: '#E95420', fontWeight: 500, letterSpacing: '0.05em',alignSelf: 'center' }}>Engenheiro de Software Mobile | Arquiteto Mobile</p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', margin: '8px 0', alignSelf: 'center' }}>
        {['React Native', 'Flutter', 'Jetpack Compose', 'SwiftUI', 'KMP'].map(s => (
          <span key={s} style={{ padding: '4px 12px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)', fontSize: '0.7rem', color: '#888' }}>{s}</span>
        ))}
      </div>
      <p style={{ maxWidth: 420, textAlign: 'left', lineHeight: 1.7, color: '#999', fontSize: '0.8rem' }}>
        Especialista em arquitetura mobile, desenvolvimento multiplataforma e soluções nativas Android/iOS. Atuo desde 2007 em codificação e desde 2015 em  projetando e entregando aplicativos de grande escala com React Native, Flutter e Jetpack Compose — equilibrando requisitos de negócio, performance e manutenibilidade. Referência técnica em definição de padrões, otimização e liderança de equipes.
      </p>
    </div>
  )
}

function SkillsContent() {
  const skills = ['Ktor', 'Flutter', 'React Native', 'Jetpack Compose', 'KMP', 'Supabase', 'Firebase', 'Injeção Dependencia', 'MVVM', 'MVI', 'SPM', 'Linux', 'N8N', 'Redux', 'Bloc', 'Riverpod', 'Gradle', 'Retrofit', 'Axios', 'DIO']
  const colors = ['#00d4ff','#7b2ff7','#ff6b6b','#ffd93d','#6bcb77','#4d96ff','#ff6b6b','#a78bfa','#34d399','#f472b6','#fbbf24','#60a5fa','#34d399','#f472b6','#a78bfa','#60a5fa','#fbbf24','#00d4ff','#7b2ff7','#ff6b6b']
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', paddingTop: 20 }}>
      {skills.map((s, i) => (
        <div key={s} style={{
          padding: '8px 18px', borderRadius: 10,
          background: `${colors[i]}08`, border: `1px solid ${colors[i]}20`,
          color: colors[i], fontSize: '0.8rem', fontWeight: 500,
          transition: 'all 0.2s', cursor: 'default'
        }}
        onMouseEnter={e => { e.currentTarget.style.background = `${colors[i]}18`; e.currentTarget.style.transform = 'scale(1.05)' }}
        onMouseLeave={e => { e.currentTarget.style.background = `${colors[i]}08`; e.currentTarget.style.transform = 'scale(1)' }}>
          {s}
        </div>
      ))}
    </div>
  )
}

function RecsContent() {
  const [sel, setSel] = useState(0)
  const r = recs[sel]
  return (
    <div style={{ display: 'flex', gap: 16, height: '100%' }}>
      <div style={{ width: 170, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
        {recs.map((rec, i) => (
          <div key={i} onClick={() => setSel(i)}
            style={{
              padding: '8px 12px', borderRadius: 8, cursor: 'pointer', fontSize: '0.75rem',
              background: sel === i ? `${rec.color}12` : 'transparent',
              border: sel === i ? `1px solid ${rec.color}30` : '1px solid transparent',
              color: sel === i ? rec.color : '#888', fontWeight: sel === i ? 600 : 400,
              transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 8
            }}>
            <img src={rec.face} alt={rec.name}
              style={{ width: 26, height: 26, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{rec.name.split(' ')[0]}</span>
          </div>
        ))}
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <a href={r.linkedin} target="_blank" rel="noopener noreferrer" style={{
          display: 'flex', gap: 14, alignItems: 'center', padding: '10px 14px',
          borderRadius: 10, background: `${r.color}08`, border: `1px solid ${r.color}15`,
          transition: 'all 0.2s', textDecoration: 'none', color: 'inherit'
        }}
        onMouseEnter={e => { e.currentTarget.style.background = `${r.color}15` }}
        onMouseLeave={e => { e.currentTarget.style.background = `${r.color}08` }}>
          <img src={r.face} alt={r.name} style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${r.color}40` }} />
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: r.color }}>{r.name}</div>
            <div style={{ fontSize: '0.65rem', color: '#666' }}>{r.title}</div>
            <div style={{ fontSize: '0.65rem', color: '#555', marginTop: 4 }}>View on LinkedIn &rarr;</div>
          </div>
        </a>
        <div style={{
          flex: 1, padding: 14, borderRadius: 10,
          background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)',
          fontSize: '0.82rem', lineHeight: 1.7, color: '#bbb', fontStyle: 'light'
        }}>
          {r.text}
        </div>
      </div>
    </div>
  )
}

function ProjContent({ onOpenProject }) {
  const videos = [
    { name: 'coffes_bar.mp4', path: '/src/assets/video/coffes_bar.mp4', label: 'Coffes Bar', title: 'Coffes Bar', desc: 'Desenvolvi uma plataforma voltada para o cliente para pedidos de produtos de café. Os principais recursos incluem facilitar a criação de pedidos selecionando as variedades de café desejadas, permitir que os usuários visualizem informações detalhadas sobre os produtos e fornecer um histórico completo de todos os pedidos realizados.', techs: ['Room', 'MVVM', 'Hilt', 'Retrofit', 'Corrotinas'], github: 'https://github.com/kenjimaeda54/Coffes-Bar-jetpack-compose' },
    { name: 'interests.mp4', path: '/src/assets/video/interests.mp4', label: 'Interests', title: 'Interests', desc: 'Aplicativo com serviços avançados baseados em localização (LBS). Permite descobrir pontos de interesse próximos, buscar por região e iniciar navegação em tempo real até o destino.', techs: ['SQLDelight', 'Koin', 'Corrotinas do Kotlin', 'Combine', 'SwiftUI', 'Compose', 'Kotlin Multiplatform', 'MVVM'], github: 'https://lnkd.in/d58eTNc7' },
    { name: 'make_travel.mp4', path: '/src/assets/video/make_travel.mp4', label: 'Make Travel', title: 'Make Travel', desc: 'Um aplicativo completo para viajantes que sugere opções de hospedagem e fornece informações essenciais antes da viagem.', techs: ['Flutter', 'Google Gemini', 'Riverpod', 'Hooks', 'API REST', 'DIO'], github: 'https://github.com/kenjimaeda54/make_your_travel_flutter' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 8, height: '100%' }}>
      {videos.map(v => (
        <div key={v.name} onClick={(e) => { e.stopPropagation(); onOpenProject(v) }}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '10px 14px', borderRadius: 10, cursor: 'pointer',
            background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)',
            transition: 'all 0.2s'
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = '#E9542040' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)' }}>
          <span style={{ fontSize: '0.82rem', color: '#ccc', fontWeight: 500 }}>{v.label}</span>
          <span style={{ fontSize: '0.7rem', color: '#E95420', fontWeight: 500 }}>Detalhes →</span>
        </div>
      ))}
    </div>
  )
}

function ProjectViewerContent({ project }) {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 12, padding: 16, overflow: 'auto' }}>
      <h2 style={{ fontSize: '1rem', fontWeight: 600, color: '#fff', margin: 0 }}>{project.title}</h2>
      <p style={{ fontSize: '0.8rem', lineHeight: 1.6, color: '#999', margin: 0 }}>{project.desc}</p>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {project.techs.map(t => (
          <span key={t} style={{ padding: '3px 10px', borderRadius: 8, background: '#77216F15', border: '1px solid #77216F30', color: '#a78bfa', fontSize: '0.65rem', fontWeight: 500 }}>{t}</span>
        ))}
      </div>
      <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.75rem', color: '#E95420', fontWeight: 500, textDecoration: 'none' }}>
        Ver código fonte →
      </a>
      <video src={project.path} controls style={{ width: '100%', borderRadius: 8, maxHeight: 250 }} autoPlay />
    </div>
  )
}

function ServicesContent({ onOpenRecs }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '12px 0' }}>
      <div style={{ textAlign: 'center', fontSize: '1rem', color: '#E95420', fontWeight: 600 }}>
        Transforme sua ideia em realidade
      </div>
      <div style={{ fontSize: '0.82rem', lineHeight: 1.7, color: '#999' }}>
        Desenvolvimento mobile para startups, empresas e empreendedores.
      </div>
      <div style={{ fontSize: '0.82rem', lineHeight: 1.7, color: '#bbb' }}>
        React Native, Flutter, Android, iOS e integração com Inteligência Artificial.
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, margin: '4px 0' }}>
        <div style={{ fontSize: '0.8rem', color: '#6bcb77' }}>✅ Aplicativos publicados na App Store e Google Play</div>
        <div style={{ fontSize: '0.8rem', color: '#6bcb77' }}>✅ Desenvolvimento sob medida</div>
        <div style={{ fontSize: '0.8rem', color: '#6bcb77' }}>✅ Consultoria técnica especializada</div>
      </div>
      <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
        <a href="https://wa.me/5535999733136?text=Olá,%20gostaria%20de%20solicitar%20um%20orçamento" target="_blank" rel="noopener noreferrer" style={{
          fontSize: '0.8rem', color: '#fff', cursor: 'pointer', fontWeight: 500,
          padding: '8px 18px', borderRadius: 8, background: '#E95420',
          border: 'none', textDecoration: 'none', transition: 'all 0.2s'
        }}
          onMouseEnter={e => { e.currentTarget.style.background = '#d04a1a' }}
          onMouseLeave={e => { e.currentTarget.style.background = '#E95420' }}>
          Solicitar orçamento
        </a>
        <div onClick={(e) => { e.stopPropagation(); onOpenRecs() }} style={{
          fontSize: '0.8rem', color: '#E95420', cursor: 'pointer', fontWeight: 500,
          padding: '8px 18px', borderRadius: 8,
          border: '1px solid #E9542040', transition: 'all 0.2s'
        }}
          onMouseEnter={e => { e.currentTarget.style.background = '#E9542015' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}>
          Ver avaliações
        </div>
      </div>
    </div>
  )
}

function ContactContent() {
  const LINK_ICONS = { LinkedIn: ExternalLink, GitHub: ExternalLink, Email: Send, YouTube: ExternalLink, Website: ExternalLink }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '16px 0' }}>
      {links.map(l => {
        const LI = LINK_ICONS[l.name]
        return (
          <a key={l.name} href={l.url} target="_blank" rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', textDecoration: "none",
              borderRadius: 10, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)',
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => { e.currentTarget.style.background = `${l.color}10`; e.currentTarget.style.borderColor = `${l.color}30`; e.currentTarget.style.transform = 'translateX(4px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)'; e.currentTarget.style.transform = 'none' }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0
            }}>
              <LI size={18} color={l.color} strokeWidth={1.5} />
            </div>
            <span style={{ fontSize: '0.85rem', fontWeight: 500, color: '#ccc' }}>{l.name}</span>
          </a>
        )
      })}
    </div>
  )
}

function PhotosContent({ onOpenPhoto }) {
  const photos = [
    'WhatsApp Image 2026-06-20 at 08.00.47.jpeg',
    'WhatsApp Image 2026-06-20 at 08.01.37.jpeg',
    'WhatsApp Image 2026-06-20 at 08.01.47.jpeg',
    'WhatsApp Image 2026-06-20 at 08.02.15.jpeg',
    'WhatsApp Image 2026-06-20 at 08.03.01.jpeg',
  ]

  const img = (name) => `/src/assets/family/${encodeURIComponent(name)}`

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: 10, alignContent: 'flex-start', overflow: 'auto', height: '100%' }}>
      {photos.map(p => (
        <div key={p} onClick={(e) => { e.stopPropagation(); onOpenPhoto(img(p)) }}
          style={{
            width: 140, borderRadius: 6, overflow: 'hidden', cursor: 'pointer',
            border: '1px solid rgba(255,255,255,0.06)', transition: 'all 0.2s', flexShrink: 0,
            background: 'rgba(255,255,255,0.02)'
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#77216F60'; e.currentTarget.style.transform = 'scale(1.03)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'scale(1)' }}>
          <img src={img(p)} alt={p}
            style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }} />
        </div>
      ))}
    </div>
  )
}

function PhotoViewerContent({ photo }) {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img src={photo} alt=""
        style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
    </div>
  )
}