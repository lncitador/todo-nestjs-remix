import { isUniqueConstraintError } from '../../utils';
import { prisma } from '../client';
import { TASKS } from './constants/tasks';
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

    const directory = await prisma.directory.create({
      data: {
        name: 'Inbox',
        userId: johndoe.id,
      },
    });

    await Promise.all(
      TASKS({ userId: johndoe.id, directoryId: directory.id }).map((task) =>
        prisma.todos.create({
          data: task,
        }),
      ),
    );
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      const target = (error as any).meta.target as string[];

      console.error(`Error: Unique constraint error on ${target.join('.')}`);
    } else {
      console.log(error);
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
