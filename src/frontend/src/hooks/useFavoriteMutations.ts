import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import { toast } from 'sonner';

export function useFavoriteMutations() {
  const { actor } = useActor();
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  const favoritesQueryKey = ['favorites', identity?.getPrincipal().toString()];

  const addFavorite = useMutation({
    mutationFn: async (wallpaperId: string) => {
      if (!actor) throw new Error('Actor not available');
      await actor.addFavorite(wallpaperId);
    },
    onMutate: async (wallpaperId) => {
      await queryClient.cancelQueries({ queryKey: favoritesQueryKey });
      
      const previousFavorites = queryClient.getQueryData<string[]>(favoritesQueryKey);
      
      queryClient.setQueryData<string[]>(favoritesQueryKey, (old = []) => {
        if (old.includes(wallpaperId)) return old;
        return [...old, wallpaperId];
      });

      return { previousFavorites };
    },
    onError: (error, wallpaperId, context) => {
      if (context?.previousFavorites) {
        queryClient.setQueryData(favoritesQueryKey, context.previousFavorites);
      }
      toast.error('Failed to add favorite');
      console.error('Add favorite error:', error);
    },
    onSuccess: () => {
      toast.success('Added to favorites');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: favoritesQueryKey });
    },
  });

  const removeFavorite = useMutation({
    mutationFn: async (wallpaperId: string) => {
      if (!actor) throw new Error('Actor not available');
      await actor.removeFavorite(wallpaperId);
    },
    onMutate: async (wallpaperId) => {
      await queryClient.cancelQueries({ queryKey: favoritesQueryKey });
      
      const previousFavorites = queryClient.getQueryData<string[]>(favoritesQueryKey);
      
      queryClient.setQueryData<string[]>(favoritesQueryKey, (old = []) => {
        return old.filter((id) => id !== wallpaperId);
      });

      return { previousFavorites };
    },
    onError: (error, wallpaperId, context) => {
      if (context?.previousFavorites) {
        queryClient.setQueryData(favoritesQueryKey, context.previousFavorites);
      }
      toast.error('Failed to remove favorite');
      console.error('Remove favorite error:', error);
    },
    onSuccess: () => {
      toast.success('Removed from favorites');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: favoritesQueryKey });
    },
  });

  return { addFavorite, removeFavorite };
}
