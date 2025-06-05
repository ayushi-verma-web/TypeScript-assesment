import { createFileRoute } from '@tanstack/react-router'
import { CharacterTable } from '../components/CharacterTable'

type CharacterSearch = {
    page: number
  }

export const Route = createFileRoute('/')({
  component: Index,
  validateSearch: (search: Record<string, unknown>): CharacterSearch => {
    return {
      page: Number(search?.page ?? 1),
    }
  },
})

function Index() {
  return (
    <div className="container mx-auto px-0">
    <header className="py-6">
      <h1 className="text-4xl font-bold text-gray-900">Rick and Morty Character List Page</h1>
    </header>
    <main>
      <CharacterTable />
    </main>
  </div>
  )
}