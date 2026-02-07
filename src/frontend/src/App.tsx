import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import AppShell from './components/layout/AppShell';
import BrowseScreen from './screens/BrowseScreen';
import WallpaperDetailScreen from './screens/WallpaperDetailScreen';
import FavoritesScreen from './screens/FavoritesScreen';

const rootRoute = createRootRoute({
  component: AppShell,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: BrowseScreen,
});

const wallpaperDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/wallpaper/$wallpaperId',
  component: WallpaperDetailScreen,
});

const favoritesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/favorites',
  component: FavoritesScreen,
});

const routeTree = rootRoute.addChildren([indexRoute, wallpaperDetailRoute, favoritesRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
