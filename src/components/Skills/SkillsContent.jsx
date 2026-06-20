export default function SkillsContent() {
  const skills = ['Ktor', 'Flutter', 'React Native', 'Jetpack Compose', 'KMP', 'Supabase', 'Firebase', 'Injeção Dependencia', 'MVVM', 'MVI', 'SPM', 'Linux', 'N8N', 'Redux', 'Bloc', 'Riverpod', 'Gradle', 'Retrofit', 'Axios', 'DIO']
  const colors = ['#00d4ff','#7b2ff7','#ff6b6b','#ffd93d','#6bcb77','#4d96ff','#ff6b6b','#a78bfa','#34d399','#f472b6','#fbbf24','#60a5fa','#34d399','#f472b6','#a78bfa','#60a5fa','#fbbf24','#00d4ff','#7b2ff7','#ff6b6b']
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', paddingTop: 20 }}>
      {skills.map((skill, index) => (
        <div key={skill} style={{
          padding: '8px 18px', borderRadius: 10,
          background: `${colors[index]}08`, border: `1px solid ${colors[index]}20`,
          color: colors[index], fontSize: '0.8rem', fontWeight: 500,
          transition: 'all 0.2s', cursor: 'default'
        }}
        onMouseEnter={e => { e.currentTarget.style.background = `${colors[index]}18`; e.currentTarget.style.transform = 'scale(1.05)' }}
        onMouseLeave={e => { e.currentTarget.style.background = `${colors[index]}08`; e.currentTarget.style.transform = 'scale(1)' }}>
          {skill}
        </div>
      ))}
    </div>
  )
}
