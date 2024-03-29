import { RadioGroup } from '@headlessui/react';
import { ListDashes, SquaresFour } from 'phosphor-react';
import React from 'react';
import { useStore } from '~/app/hooks/useStore';

export const ListViewGroup: React.FC = () => {
  const [listView, toggleListView] = useStore((state) => state.useListView);

  return (
    <RadioGroup value={listView} onChange={toggleListView}>
      <RadioGroup.Label className="sr-only">List view toggle</RadioGroup.Label>
      <div className="flex gap-2 font-semibold">
        <RadioGroup.Option
          value="list"
          className={({ checked }) => `
                flex items-center justify-center w-8 h-8
                ${checked ? 'text-sky-600' : ''}
            `}
        >
          <ListDashes size={24} />
        </RadioGroup.Option>
        <RadioGroup.Option
          value="grid"
          className={({ checked }) => `
                flex items-center justify-center w-8 h-8
                ${checked ? 'text-sky-600' : ''}
            `}
        >
          <SquaresFour size={24} />
        </RadioGroup.Option>
      </div>
    </RadioGroup>
  );
};
