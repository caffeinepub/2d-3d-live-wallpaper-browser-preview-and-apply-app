import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';

export function useFavoritesQuery() {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();

  const isAuthenticated = !!identity;

  return useQuery<string[]>({
    queryKey: ['favorites', identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor || !isAuthenticated) return [];
      
      try {
        return await actor.getFavorites();
      } catch (error) {
        console.error('Failed to fetch favorites:', error);
        return [];
      }
    },
    enabled: !!actor && !actorFetching && isAuthenticated,
    staleTime: 30 * 1000, // 30 seconds
  });
}
