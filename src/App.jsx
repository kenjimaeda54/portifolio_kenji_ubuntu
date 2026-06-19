import { useState, useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { User, Zap, MessageSquareText, FolderOpen, Wrench, Send, ExternalLink } from 'lucide-react'

const TUX = '/images/tux.png'

const APP_ICONS = {
  profile: User, skills: Zap, recs: MessageSquareText,
  projects: FolderOpen, services: Wrench, contact: Send,
}

const apps = [
  { id: 'profile', label: 'Perfil', color: '#E95420' },
  { id: 'skills', label: 'Habilidades', color: '#77216F' },
  { id: 'recs', label: 'Recomendações', color: '#E95420' },
  { id: 'projects', label: 'Projetos', color: '#77216F' },
  { id: 'services', label: 'Serviços', color: '#AEA79F' },
  { id: 'contact', label: 'Contato', color: '#E95420' },
]

const recs = [
  { name: 'Marileia Rocha', title: 'Assistente Social Corporativa', text: 'Tenho acompanhado o trabalho voluntário de Ricardo no desenvolvimento do aplicativo da Ciclar e destaco seu comprometimento, responsabilidade e dedicação.', linkedin: 'https://www.linkedin.com/in/marileiarocha/', face: '/images/faces/marileia.jpg', color: '#AEA79F' },
  { name: 'Cledir Girotto', title: 'Founder na Mopi | PM', text: 'Ricardo entende muito de iOS e se esforçou para contornar as barreiras impostas pelo sistema operacional. Recomendo o trabalho dele!', linkedin: 'https://www.linkedin.com/in/cledirgirotto/', face: '/images/faces/cledir.jpg', color: '#AEA79F' },
  { name: 'Luiz Gabriel Bianchi', title: 'React Native | iOS Dev', text: 'Trabalhei 2 meses com Ricardo em melhorias de performance. Conhecimento sólido em React Native, Flutter, Swift. Código de qualidade.', linkedin: 'https://www.linkedin.com/in/luizgabrielrebelatto/', face: '/images/faces/luiz.jpg', color: '#AEA79F' },
  { name: 'Carlos Oliveira', title: 'Front-end | React & Next.js', text: 'Profissionalismo e gentileza. Busca excelência nos projetos e está sempre disposto a ajudar com as melhores práticas.', linkedin: 'https://www.linkedin.com/in/carlos-oliveira-ab93941a1/', face: '/images/faces/carlos.jpg', color: '#AEA79F' },
]

const projetos = [
  { name: 'animation-react-native', lang: 'TypeScript', url: 'https://github.com/kenjimaeda54/animation-react-native', stars: 5, color: '#3178c6' },
  { name: 'rentex-jetpack-compose', lang: 'Kotlin', url: 'https://github.com/kenjimaeda54/rentex-jetpack-compose', stars: 1, color: '#7f52ff' },
  { name: 'coffes_bar_swiftUi', lang: 'Swift', url: 'https://github.com/kenjimaeda54/coffes_bar_swiftUi', stars: 1, color: '#f05138' },
  { name: 'news_cool_react_native', lang: 'TypeScript', url: 'https://github.com/kenjimaeda54/news_cool_react_native', stars: 0, color: '#3178c6' },
  { name: 'news_cool_swiftUi', lang: 'Swift', url: 'https://github.com/kenjimaeda54/news_cool_swiftUi', stars: 0, color: '#f05138' },
  { name: 'introdution-spliting', lang: 'Java', url: 'https://github.com/kenjimaeda54/introdution-spliting-react-native', stars: 1, color: '#ed8b00' },
]

const links = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/kenjimaeda1233/', color: '#0a66c2' },
  { name: 'GitHub', url: 'https://github.com/kenjimaeda54', color: '#fff' },
  { name: 'Email', url: 'mailto:kenjimaedafamily@gmail.com', color: '#ea4335' },
  { name: 'YouTube', url: 'https://www.youtube.com/@kenjiMaeda-Ti', color: '#ff0000' },
  { name: 'Website', url: 'https://kvm-skills.onrender.com', color: '#E95420' },
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
          {apps.slice(0, 3).map(a => (
            <DesktopIcon key={a.id} app={a} onClick={() => openWindow(a.id)} />
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {apps.slice(3).map(a => (
            <DesktopIcon key={a.id} app={a} onClick={() => openWindow(a.id)} />
          ))}
        </div>
      </div>

      {/* Windows */}
      {apps.map(a => windows[a.id] && (
        <Window key={a.id} app={a} isFocused={open === a.id}
          onClose={() => closeWindow(a.id)} onFocus={() => focusWindow(a.id)}
          onOpenRecs={() => openWindow('recs')} />
      ))}

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
function Window({ app, isFocused, onClose, onFocus, onOpenRecs }) {
  const [pos, setPos] = useState({ x: 80 + Math.random() * 120, y: 50 + Math.random() * 80 })
  const [drag, setDrag] = useState(null)

  const isRecs = app.id === 'recs'
  const isProj = app.id === 'projects'
  const isContact = app.id === 'contact'
  const w = isRecs ? 620 : isProj ? 560 : isContact ? 480 : 520
  const h = isRecs ? 460 : isProj ? 380 : isContact ? 360 : 400

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
      <div style={{ padding: 16, height: 'calc(100% - 42px)', overflow: 'auto' }}>
        {app.id === 'profile' && <ProfileContent />}
        {app.id === 'skills' && <SkillsContent />}
        {app.id === 'recs' && <RecsContent />}
        {app.id === 'projects' && <ProjContent />}
        {app.id === 'services' && <ServicesContent onOpenRecs={onOpenRecs} />}
        {app.id === 'contact' && <ContactContent />}
      </div>
    </div>
  )
}

/* ─── CONTENT ─── */
function ProfileContent() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, paddingTop: 20 }}>
      <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, #E95420, #77216F)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 700, color: '#fff' }}>KM</div>
      <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#fff' }}>Kenji Maeda</h1>
      <p style={{ fontSize: '0.85rem', color: '#E95420', fontWeight: 500, letterSpacing: '0.05em' }}>Senior Mobile Software Engineer</p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', margin: '8px 0' }}>
        {['React Native', 'Flutter', 'Jetpack Compose', 'SwiftUI', 'KMP'].map(s => (
          <span key={s} style={{ padding: '4px 12px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)', fontSize: '0.7rem', color: '#888' }}>{s}</span>
        ))}
      </div>
      <p style={{ maxWidth: 420, textAlign: 'center', lineHeight: 1.7, color: '#999', fontSize: '0.8rem' }}>
        Senior Mobile Engineer desde 2021. Experiência em arquitetura, performance e escalabilidade em aplicativos de larga escala. Atua como referência técnica em mentoria e definição de padrões.
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

function ProjContent() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 8 }}>
      {projetos.map(p => (
        <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px',
            borderRadius: 10, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)',
            transition: 'all 0.2s', cursor: 'pointer'
          }}
          onMouseEnter={e => { e.currentTarget.style.background = `${p.color}08`; e.currentTarget.style.borderColor = `${p.color}25` }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)' }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: `${p.color}15`, border: `1px solid ${p.color}25`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.55rem', fontWeight: 700, color: p.color, flexShrink: 0
          }}>{p.lang.slice(0, 2).toUpperCase()}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 500, color: '#ccc' }}>{p.name}</div>
            <div style={{ fontSize: '0.65rem', color: '#555' }}>{p.lang}</div>
          </div>
          {p.stars > 0 && <div style={{ fontSize: '0.7rem', color: '#555' }}>{p.stars} ★</div>}
        </a>
      ))}
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 16 }}>
      {links.map(l => {
        const LI = LINK_ICONS[l.name]
        return (
          <a key={l.name} href={l.url} target="_blank" rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px',
              borderRadius: 10, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)',
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => { e.currentTarget.style.background = `${l.color}10`; e.currentTarget.style.borderColor = `${l.color}30`; e.currentTarget.style.transform = 'translateX(4px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)'; e.currentTarget.style.transform = 'none' }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: `${l.color}15`, border: `1px solid ${l.color}25`,
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