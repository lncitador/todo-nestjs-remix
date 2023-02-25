import { LoaderFunction } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import { wireLoader } from 'nest-remix/core.server';
import { PublicLayoutBackend } from '~/shared/infrastructure/server/public-layout.server';
import { ToggleTheme } from '../components/ToggleTheme';
import { StoreProvider } from '../contexts/store';

const loader: LoaderFunction = (args) => wireLoader(PublicLayoutBackend, args);

function PublicLayout() {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="absolute right-4 top-4">
        <ToggleTheme />
      </div>
      <StoreProvider>
        <Outlet />
      </StoreProvider>
    </div>
  );
}

export { loader };
export default PublicLayout;
