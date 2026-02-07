import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useFavoriteMutations } from '@/hooks/useFavoriteMutations';
import { useFavoritesQuery } from '@/hooks/useFavoritesQuery';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface FavoriteToggleButtonProps {
  wallpaperId: string;
  compact?: boolean;
}

export default function FavoriteToggleButton({ wallpaperId, compact = false }: FavoriteToggleButtonProps) {
  const { identity, login, isLoggingIn } = useInternetIdentity();
  const { data: favoriteIds } = useFavoritesQuery();
  const { addFavorite, removeFavorite } = useFavoriteMutations();

  const isAuthenticated = !!identity;
  const isFavorite = favoriteIds?.includes(wallpaperId) || false;

  const handleToggle = async () => {
    if (!isAuthenticated) {
      toast.info('Please sign in to save favorites');
      login();
      return;
    }

    if (isFavorite) {
      removeFavorite.mutate(wallpaperId);
    } else {
      addFavorite.mutate(wallpaperId);
    }
  };

  const isLoading = addFavorite.isPending || removeFavorite.isPending;

  if (compact) {
    return (
      <Button
        onClick={handleToggle}
        disabled={isLoading || isLoggingIn}
        size="icon"
        variant="secondary"
        className={cn(
          'backdrop-blur-sm bg-background/80 transition-colors',
          isFavorite && 'text-primary'
        )}
      >
        <Heart className={cn('w-4 h-4', isFavorite && 'fill-current')} />
      </Button>
    );
  }

  return (
    <Button
      onClick={handleToggle}
      disabled={isLoading || isLoggingIn}
      variant={isFavorite ? 'default' : 'outline'}
      size="icon"
      className="transition-all"
    >
      <Heart className={cn('w-5 h-5', isFavorite && 'fill-current')} />
    </Button>
  );
}
