import { prisma } from '../../client';

export const createUser = prisma.user.create({
  data: {
    email: 'johndoe@mail.com',
    password: '1234',
    name: 'John Doe',
  },
});
