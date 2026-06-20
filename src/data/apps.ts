import { User, Zap, MessageSquareText, FolderOpen, Wrench, Send, Image, FileText } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface AppConfig {
  id: string
  label: string
  color: string
}

export const APP_ICONS: Record<string, LucideIcon> = {
  profile: User, skills: Zap, recs: MessageSquareText,
  projects: FolderOpen, services: Wrench, contact: Send, photos: Image, articles: FileText,
}

export const apps: AppConfig[] = [
  { id: 'profile', label: 'Perfil', color: '#E95420' },
  { id: 'skills', label: 'Habilidades', color: '#77216F' },
  { id: 'recs', label: 'Recomendações', color: '#E95420' },
  { id: 'projects', label: 'Projetos', color: '#77216F' },
  { id: 'services', label: 'Serviços', color: '#AEA79F' },
  { id: 'contact', label: 'Contato', color: '#E95420' },
  { id: 'photos', label: 'Fotos', color: '#77216F' },
  { id: 'articles', label: 'Artigos', color: '#AEA79F' },
]

export const leftApps: AppConfig[] = apps.slice(0, 4)
export const rightApps: AppConfig[] = apps.slice(4)