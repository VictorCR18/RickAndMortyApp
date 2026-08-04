import { FlaskConical, Orbit, Rocket } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import type { CSSProperties, MouseEvent } from 'react'
import type { CharacterCardProps } from '../types'

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

export function CharacterCard({ character, onSelect }: CharacterCardProps) {
  const shouldReduceMotion = useReducedMotion()
  const statusStyle = getStatusStyle(character.status)

  const cardStyle = {
    '--status-color': statusStyle.color,
    '--status-glow': statusStyle.glow,
  } as CSSProperties

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault()
    onSelect(character)
  }

  return (
    <motion.article
      // Entrada suave ao montar o card.
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
      animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.02, y: -4, boxShadow: '0 16px 36px rgba(0, 0, 0, 0.28)' }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.97, y: 2 }}
      transition={{ duration: 0.24, ease: 'easeOut' }}
      className="character-card"
      style={cardStyle}
      onClick={handleOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onSelect(character)
        }
      }}
    >
      <div className="character-image-wrap">
        <img src={character.image} alt={character.name} />
      </div>

      <div className="character-info">
        <h3 className="character-name">{character.name}</h3>

        {/* Indicador de status com pulso e halo neon. */}
        <div className="character-status-row" aria-label={`Status: ${statusStyle.label}`}>
          <span className="status-text">
          <span className="status-dot" />
            <span className="detail-label">
              <FlaskConical size={14} style={{ marginRight: 4, verticalAlign: 'text-bottom' }} /> Status:
            </span>{' '}
            {character.status}
          </span>
        </div>

        <div className="character-details">
          <p>
            <span className="detail-label">
              <Orbit size={14} style={{ marginRight: 4, verticalAlign: 'text-bottom' }} /> Espécie:
            </span>{' '}
            {character.species}
          </p>
          <p>
            <span className="detail-label">
              <Rocket size={14} style={{ marginRight: 4, verticalAlign: 'text-bottom' }} /> Origem:
            </span>{' '}
            {character.origin.name}
          </p>
        </div>
      </div>
    </motion.article>
  )
}
