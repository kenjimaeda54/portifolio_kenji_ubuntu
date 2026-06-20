import { articles } from '@/data/articles'

export default function ArticlesContent() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 8, height: '100%' }}>
      {articles.map((article, index) => (
        <a key={index} href={article.url} target="_blank" rel="noopener noreferrer" onClick={(e: React.MouseEvent) => e.stopPropagation()}
          style={{
            display: 'flex', flexDirection: 'column', gap: 4, padding: '12px 14px', borderRadius: 10,
            background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)',
            transition: 'all 0.2s', textDecoration: 'none'
          }}
          onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = '#AEA79F40' }}
          onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#AEA79F' }}>{article.title}</span>
          <span style={{ fontSize: '0.72rem', color: '#888', lineHeight: 1.5 }}>{article.desc}</span>
          <span style={{ fontSize: '0.65rem', color: '#555', marginTop: 2 }}>Abrir artigo →</span>
        </a>
      ))}
    </div>
  )
}