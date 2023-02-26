export type SortValue =
  | 'order-added'
  | 'min-date'
  | 'max-date'
  | 'completed-first'
  | 'uncompleted-first';

export type SortItem = {
  value: SortValue;
  title: string;
};

export const sortList: SortItem[] = [
  { value: 'order-added', title: 'Order added' },
  { value: 'min-date', title: 'Earlier first' },
  { value: 'max-date', title: 'Later first' },
  { value: 'completed-first', title: 'Completed first' },
  { value: 'uncompleted-first', title: 'Uncompleted first' },
];
