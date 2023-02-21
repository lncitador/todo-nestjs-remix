import { prisma } from '../../client';

export const createUser = prisma.user.create({
  data: {
    email: 'johndoe@mail.com',
    password: '$2b$10$Fe.woxK9OXOETmiXO/8T2Olg6G7O1JzQ1Yjud5J3rb3sC2mXfT.Ry', // 12345678
    name: 'John Doe',
  },
});
