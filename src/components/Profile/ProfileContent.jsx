export default function ProfileContent() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16, padding: '20px 16px' }}>
      <img src="/assets/perfil.jpeg" alt="Kenji Maeda"
        style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', alignSelf: 'center' }} />
      <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#fff', alignSelf: 'center' }}>Kenji Maeda</h1>
      <p style={{ fontSize: '0.85rem', color: '#E95420', fontWeight: 500, letterSpacing: '0.05em', alignSelf: 'center' }}>Engenheiro de Software Mobile | Arquiteto Mobile</p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', margin: '8px 0', alignSelf: 'center' }}>
        {['React Native', 'Flutter', 'Jetpack Compose', 'SwiftUI', 'KMP'].map(skill => (
          <span key={skill} style={{ padding: '4px 12px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)', fontSize: '0.7rem', color: '#888' }}>{skill}</span>
        ))}
      </div>
      <p style={{ maxWidth: 420, textAlign: 'left', lineHeight: 1.7, color: '#999', fontSize: '0.8rem' }}>
        Especialista em arquitetura mobile, desenvolvimento multiplataforma e soluções nativas Android/iOS. Atuo desde 2007 em codificação e desde 2015 projetando e entregando aplicativos de grande escala com React Native, Flutter e Jetpack Compose — equilibrando requisitos de negócio, performance e manutenibilidade. Referência técnica em definição de padrões, otimização e liderança de equipes.
      </p>
    </div>
  )
}
