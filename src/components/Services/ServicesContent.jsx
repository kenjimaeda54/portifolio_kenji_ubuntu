export default function ServicesContent({ onOpenRecs }) {
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
