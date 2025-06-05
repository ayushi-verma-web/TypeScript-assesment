import type { ApiResponse, Character } from './types';

const API_BASE = 'https://rickandmortyapi.com/api';

export const fetchCharacters = async (page: number): Promise<ApiResponse> => {
  const response = await fetch(`${API_BASE}/character?page=${page}`);
  if (!response.ok) {
    throw new Error('Failed to fetch characters');
  }
  return response.json();
};

export const fetchCharacterById = async (id: string): Promise<Character> => {
  const response = await fetch(`${API_BASE}/character/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch character details');
  }
  return response.json();
};