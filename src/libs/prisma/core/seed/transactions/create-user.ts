import { prisma } from '../../client';

export const createUser = prisma.user.create({
  data: {
    email: 'johndoe@mail.com',
    password: '$2b$10$knZZqAxdZFMuPY3Aqj47heaReTriTWA13aKrejFsRdikUAcorCZe2', // Asdf1234!
    name: 'John Doe',
  },
});
