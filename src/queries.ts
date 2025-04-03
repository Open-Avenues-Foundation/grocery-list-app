import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

const prisma = new PrismaClient()
  .$extends(withAccelerate());

// A `main` function so that we can use async/await
async function main() {
  const list = await prisma.groceryList.create({
    data: {
      name: 'Groceries',
    },
  });

  console.log(list);

  const items = await prisma.item.createMany({
    data: [
      { name: 'Apples', quantity: 10, listId: list.id },
      { name: 'Bananas', quantity: 5, listId: list.id },
    ],
  });

  console.log(items);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
