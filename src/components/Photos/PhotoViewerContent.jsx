export default function PhotoViewerContent({ photo }) {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img src={photo} alt=""
        style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
    </div>
  )
}
