import { familyPhotos } from '../../data/photos'

export default function PhotosContent({ onOpenPhoto }) {
  const imageUrl = (name) => `/src/assets/family/${encodeURIComponent(name)}`

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: 10, alignContent: 'flex-start', overflow: 'auto', height: '100%' }}>
      {familyPhotos.map(photo => (
        <div key={photo} onClick={(e) => { e.stopPropagation(); onOpenPhoto(imageUrl(photo)) }}
          style={{
            width: 140, borderRadius: 6, overflow: 'hidden', cursor: 'pointer',
            border: '1px solid rgba(255,255,255,0.06)', transition: 'all 0.2s', flexShrink: 0,
            background: 'rgba(255,255,255,0.02)'
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#77216F60'; e.currentTarget.style.transform = 'scale(1.03)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'scale(1)' }}>
          <img src={imageUrl(photo)} alt={photo}
            style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }} />
        </div>
      ))}
    </div>
  )
}
