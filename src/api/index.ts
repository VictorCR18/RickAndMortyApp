import axios from 'axios'
import type { Character, CharacterFilters, CharactersResponse } from '../types'

const api = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export async function getCharacters(
  page = 1,
  filters: CharacterFilters = {},
): Promise<Character[]> {
  const params: Record<string, string | number | undefined> = { page }

  if (filters.name) {
    params.name = filters.name
  }

  if (filters.status) {
    params.status = filters.status
  }

  if (filters.species) {
    params.species = filters.species
  }

  const response = await api.get<CharactersResponse>('/character', {
    params,
  })

  return response.data.results
}
