import type { Video } from '@/data/videos'

export default function ProjectViewerContent({ project }: { project: Video }) {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 12, padding: 16, overflow: 'auto' }}>
      <h2 style={{ fontSize: '1rem', fontWeight: 600, color: '#fff', margin: 0 }}>{project.title}</h2>
      <p style={{ fontSize: '0.8rem', lineHeight: 1.6, color: '#999', margin: 0 }}>{project.desc}</p>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {project.techs.map(tech => (
          <span key={tech} style={{ padding: '3px 10px', borderRadius: 8, background: '#77216F15', border: '1px solid #77216F30', color: '#a78bfa', fontSize: '0.65rem', fontWeight: 500 }}>{tech}</span>
        ))}
      </div>
      <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.75rem', color: '#E95420', fontWeight: 500, textDecoration: 'none' }}>
        Ver código fonte →
      </a>
      <video src={project.path} controls style={{ width: '100%', borderRadius: 8, maxHeight: 250 }} autoPlay />
    </div>
  )
}