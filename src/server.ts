import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello, World!');
});

app.get('/grocery-lists', async (req: express.Request, res: express.Response) => {
  const groceryLists = await prisma.groceryList.findMany();
  res.json(groceryLists);
});

app.post('/grocery-lists', async (req: express.Request, res: express.Response) => {
  const { name } = req.body;
  const groceryList = await prisma.groceryList.create({
    data: { name },
  });
  res.json(groceryList);
});

app.get('/grocery-lists/:id', async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const groceryList = await prisma.groceryList.findUnique({
    where: { id: parseInt(id) },
  });
  res.json(groceryList);
});

app.get('/grocery-lists/:id/items', async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const items = await prisma.item.findMany({
    where: { listId: parseInt(id) },
  });
  res.json(items);
});

app.post('/grocery-lists/:id/items', async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const item = await prisma.item.create({
    data: { name, quantity, listId: parseInt(id) },
  });
  res.json(item);
});

app.put('/grocery-lists/:id/items/:itemId', async (req: express.Request, res: express.Response) => {
  const { id, itemId } = req.params;
  const { name, quantity } = req.body;
  const item = await prisma.item.update({
    where: { id: parseInt(itemId) },
    data: { name, quantity },
  });
  res.json(item);
});

app.delete('/grocery-lists/:id/items/:itemId', async (req: express.Request, res: express.Response) => {
  const { id, itemId } = req.params;
  await prisma.item.delete({
    where: { id: parseInt(itemId) },
  });
  res.json({ message: 'Item deleted' });
});

app.put('/grocery-lists/:id/items/:itemId/purchase', async (req: express.Request, res: express.Response) => {
  const { id, itemId } = req.params;
  const item = await prisma.item.update({
    where: { id: parseInt(itemId) },
    data: { purchased: true },
  });
  res.json(item);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
