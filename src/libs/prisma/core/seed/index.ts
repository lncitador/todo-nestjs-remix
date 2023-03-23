import { isUniqueConstraintError } from '../../utils';
import { prisma } from '../client';
import { createUser } from './transactions/create-user';

async function main() {
  try {
    await prisma.$transaction([createUser]);

    const johndoe = await prisma.user.findUnique({
      where: { email: 'johndoe@mail.com' },
    });

    if (!johndoe) {
      throw new Error('User not found');
    }

    console.log('User created:', johndoe);
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      console.error('User already exists');
    } else {
      console.error('Something went wrong');
      console.error(error);
    }
  }
}

main()
  .catch(() => {
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
