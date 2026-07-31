import { FlaskConical, Orbit, Rocket, Telescope, Tv, Sparkles } from 'lucide-react'
import type { CSSProperties } from 'react'
import type { CharacterModalProps } from '../types'
import { Modal } from './Modal'

function getStatusStyle(status: string) {
  const normalized = status.toLowerCase()

  switch (normalized) {
    case 'alive':
      return {
        color: '#22c55e',
        glow: 'rgba(34, 197, 94, 0.35)',
        label: 'Alive',
      }
    case 'dead':
      return {
        color: '#ef4444',
        glow: 'rgba(239, 68, 68, 0.35)',
        label: 'Dead',
      }
    default:
      return {
        color: '#eab308',
        glow: 'rgba(234, 179, 8, 0.35)',
        label: 'Unknown',
      }
  }
}

function formatCreatedDate(date: string) {
  const parsed = new Date(date)
  return Number.isNaN(parsed.getTime())
    ? date
    : parsed.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export function CharacterModal({ character, isOpen, onClose }: CharacterModalProps) {
  if (!character) {
    return null
  }

  const statusStyle = getStatusStyle(character.status)
  const statusVars = {
    '--status-color': statusStyle.color,
    '--status-glow': statusStyle.glow,
  } as CSSProperties

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={character.name}>
      <div className="character-modal" style={statusVars}>
        <img src={character.image} alt={character.name} className="character-modal-image" />

        <div className="character-modal-body">
          <div className="character-status-row modal-status-row" aria-label={`Status: ${statusStyle.label}`}>
            <span className="status-dot" />
            <span>
              <span className="detail-label">Status:</span> {character.status}
            </span>
          </div>

          <div className="character-modal-grid">
            <div>
              <span className="detail-label">
                <Orbit size={14} style={{ marginRight: 4, verticalAlign: 'text-bottom' }} /> Espécie
              </span>
              <p>{character.species}</p>
            </div>
            <div>
              <span className="detail-label">
                <Sparkles size={14} style={{ marginRight: 4, verticalAlign: 'text-bottom' }} /> Tipo
              </span>
              <p>{character.type || 'Desconhecido'}</p>
            </div>
            <div>
              <span className="detail-label">
                <FlaskConical size={14} style={{ marginRight: 4, verticalAlign: 'text-bottom' }} /> Gênero
              </span>
              <p>{character.gender}</p>
            </div>
            <div>
              <span className="detail-label">
                <Rocket size={14} style={{ marginRight: 4, verticalAlign: 'text-bottom' }} /> Origem
              </span>
              <p>{character.origin.name}</p>
            </div>
            <div>
              <span className="detail-label">
                <Telescope size={14} style={{ marginRight: 4, verticalAlign: 'text-bottom' }} /> Localização atual
              </span>
              <p>{character.location.name}</p>
            </div>
            <div>
              <span className="detail-label">
                <Tv size={14} style={{ marginRight: 4, verticalAlign: 'text-bottom' }} /> Episódios
              </span>
              <p>Aparece em {character.episode.length} episódios</p>
            </div>
          </div>

          <div className="character-modal-meta">
            <p>
              <span className="detail-label">Criado em:</span> {formatCreatedDate(character.created)}
            </p>
            <p>
              <span className="detail-label">URL:</span>{' '}
              <a href={character.url} target="_blank" rel="noreferrer">
                Ver no Rick and Morty API
              </a>
            </p>
          </div>
        </div>
      </div>
    </Modal>
  )
}
