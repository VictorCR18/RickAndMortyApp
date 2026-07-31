import type { ReactNode } from 'react'

export interface Character {
  id: number
  name: string
  status: 'Alive' | 'Dead' | 'unknown'
  species: string
  type: string
  gender: string
  origin: {
    name: string
    url: string
  }
  location: {
    name: string
    url: string
  }
  image: string
  episode: string[]
  url: string
  created: string
}

export interface CharactersResponse {
  results: Character[]
}

export interface CharacterFilters {
  name?: string
  status?: string
  species?: string
}

export interface AnimatedCardProps {
  children: ReactNode
  title?: string
}

export interface CharacterCardProps {
  character: Character
  onSelect: (character: Character) => void
}

export interface CharacterModalProps {
  character: Character | null
  isOpen: boolean
  onClose: () => void
}

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
}

export interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}
