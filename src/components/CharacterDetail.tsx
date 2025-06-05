import { useQuery } from '@tanstack/react-query';
import { fetchCharacterById } from '../api/character';
import { type Character } from '../api/types';
import { Link, useParams } from '@tanstack/react-router'
export const CharacterDetails = () => {
  const { id } = useParams({from:`/character/$id`});
  
  const {
    data: character,
    isLoading,
    isError,
  } = useQuery<Character, Error>({
    queryKey: ['character', id],
    queryFn: () => fetchCharacterById(id || ''),
  });

  if (isLoading) return <div className="p-4 text-center">Loading character details...</div>;
  if (isError) return <div className="p-4 text-center text-red-500">Error loading character details</div>;
  if(!character) return <div className="p-4 text-center">Character not found</div>;

  return (
    <div className="detail-page">
      <Link 
      to="/" 
      search={(prev:any) => ({ ...prev, page: prev.page || 1 })}
      className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to List
      </Link>
      <div className="card-detail">
        <img
          src={character.image}
          alt={character.name}
        />
        <div className='detail-footer'>
        <h2 className="char-name">{character.name}</h2>
        <p className="char-details"><span>Species:</span> {character.species}</p>
        <p className="char-details"><span>Status:</span> {character.status}</p>
        <p className="char-details"><span>Gender:</span> {character.gender}</p>
        <p className="char-details"><span>Origin:</span> {character.origin.name}</p>
        </div>
      </div>
    </div>
  );
};