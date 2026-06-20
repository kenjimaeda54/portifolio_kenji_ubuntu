import { videos } from '@/data/videos'
import type { Video } from '@/data/videos'

export default function ProjContent({ onOpenProject }: { onOpenProject: (project: Video) => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 8, height: '100%' }}>
      {videos.map(video => (
        <div key={video.name} onClick={(e: React.MouseEvent) => { e.stopPropagation(); onOpenProject(video) }}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '10px 14px', borderRadius: 10, cursor: 'pointer',
            background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = '#E9542040' }}
          onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)' }}>
          <span style={{ fontSize: '0.82rem', color: '#ccc', fontWeight: 500 }}>{video.label}</span>
          <span style={{ fontSize: '0.7rem', color: '#E95420', fontWeight: 500 }}>Detalhes →</span>
        </div>
      ))}
    </div>
  )
}