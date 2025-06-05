import { createFileRoute } from '@tanstack/react-router'
import { CharacterDetails } from '../components/CharacterDetail'

export const Route = createFileRoute('/character/$id')({
  component: CharacterDetails,
})
