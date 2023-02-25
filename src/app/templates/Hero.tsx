import React from 'react';
import { ListViewGroup } from '../components/ListViewGroup';
import { SortBy } from '../components/SortBy';

export const Hero: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <ListViewGroup />
      <div className="ml-auto">
        <SortBy />
      </div>
    </div>
  );
};
