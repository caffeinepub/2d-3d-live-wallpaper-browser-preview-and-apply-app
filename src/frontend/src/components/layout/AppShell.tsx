import { Outlet, useNavigate, useRouterState } from '@tanstack/react-router';
import LoginButton from '@/components/auth/LoginButton';
import { Button } from '@/components/ui/button';
import { Heart, Image } from 'lucide-react';

export default function AppShell() {
  const navigate = useNavigate();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src="/assets/generated/app-logo.dim_512x512.png"
              alt="Logo"
              className="w-8 h-8 rounded-lg"
            />
            <span className="font-bold text-xl tracking-tight">Wallpaper Gallery</span>
          </div>

          <nav className="flex items-center gap-2">
            <Button
              variant={currentPath === '/' ? 'default' : 'ghost'}
              onClick={() => navigate({ to: '/' })}
              className="gap-2"
            >
              <Image className="w-4 h-4" />
              <span className="hidden sm:inline">Browse</span>
            </Button>
            <Button
              variant={currentPath === '/favorites' ? 'default' : 'ghost'}
              onClick={() => navigate({ to: '/favorites' })}
              className="gap-2"
            >
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline">Favorites</span>
            </Button>
            <LoginButton />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-8 mt-16">
        <div className="container text-center text-sm text-muted-foreground">
          <p>
            © 2026. Built with <Heart className="inline w-4 h-4 text-primary" /> using{' '}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:text-foreground transition-colors underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
