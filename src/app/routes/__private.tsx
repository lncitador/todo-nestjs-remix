import { LoaderFunction } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import { wireLoader } from 'nest-remix/core.server';
import React from 'react';
import { PrivateLayoutBackend } from '~/shared/infrastructure/server/private-layout.server';

const loader: LoaderFunction = (args) => wireLoader(PrivateLayoutBackend, args);

const Home: React.FC = () => {
  return <Outlet />;
};

export { loader };

export default Home;
