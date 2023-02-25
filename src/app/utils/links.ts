export const links = [
  {
    name: "Today's tasks",
    path: '/today',
  },
  {
    name: 'All tasks',
    path: '/',
  },
  {
    name: 'Important tasks',
    path: '/important',
  },
  {
    name: 'Completed tasks',
    path: '/completed',
  },
  {
    name: 'Uncompleted tasks',
    path: '/uncompleted',
  },
];

export const hasValidPath = (path: string) => {
  if (path.startsWith('/')) {
    return links.some((link) => link.path === path);
  } else {
    return links.some((link) => link.path === `/${path}`);
  }
};
